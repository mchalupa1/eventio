"use client";
import Allboxgrip from "../AllBoxGrip/AllboxGrip";
import Navbar from "@/componens/Navbar/navbar";
import EventsList from "./even";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import CreateBtn from "./componens/CreateBtn";
import Head from "./componens/Head";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import { ThemeContext } from "./componens/Context/Filter";

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

export default function Page() {
  /*Data fetching*/
  const [data, setData] = useState<Event[]>([]);
  const [OriginalData, setoRData] = useState<Event[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "events");

      onSnapshot(colRef, (snapshot) => {
        const newData: Event[] = [];

        snapshot.forEach((doc) => {
          newData.push(doc.data() as Event);
        });

        setData(newData);
        setoRData(newData);
      });
    };

    void fetchData();
  }, []);

  /*list grip changig color*/
  const [grip, setgrip] = useState(true);

  return (
    <div className={style.all}>
      <ThemeContext.Provider
        value={{ data, setData, OriginalData, setoRData, grip, setgrip }}
      >
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
      </ThemeContext.Provider>
    </div>
  );
}
