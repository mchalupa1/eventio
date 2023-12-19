"use client";
import Allboxgrip from "../AllBoxGrip/AllboxGrip";
import Navbar from "@/componens/Navbar/navbar";
import EventsList from "./even";
import style from "./page.module.css";
import { createContext, useContext, useEffect, useState } from "react";
import CreateBtn from "./componens/CreateBtn";
import Head from "./componens/Head";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import { Data } from "./componens/Context";

export type Event = {
  title: string;
  date: string;
  id: string;
  description: string;
  capacity: string;
  joiners: string;
  time: string;
  authorUID: string;
};

type ThemeContext = {
  data: Event[];
  setData: React.Dispatch<React.SetStateAction<Event[]>>;
};

/*ContextProviding*/
export const theme = createContext<ThemeContext | null>(null);
export function useThemeContext(){
  const context = useContext(theme);
  if(!context) {
    throw new Error("foo")
  }
  return context;
}

export default function Page() {
  
  /* Data fetching */
  const [data, setData] = useState<Event[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "events");

      onSnapshot(colRef, (snapshot) => {
        const newData: Event[] = [];

        snapshot.forEach((doc) => {
          newData.push(doc.data() as Event);
        });
        setData(newData);
      });
    };
    void fetchData();
  }, []);

  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };

  return (
    <div className={style.all}>
      <theme.Provider value={{ data, setData }}>
        <Navbar></Navbar>
        <div className={style.middlePart}>
          <Head></Head>
          {grip ? (
            <EventsList grip={grip}></EventsList>
          ) : (
            <Allboxgrip></Allboxgrip>
          )}
        </div>
        <CreateBtn></CreateBtn>
      </theme.Provider>
    </div>
  );
}
