"use client";
import BtnEvent from "@/componens/BtnEvent/page";
import Mentor from "@/app/Dashboard/even/component/Mentor";
import DateTime from "./component/DateTime"
import Title from "./component/Title"
import styles from "./index.module.css";
import { auth } from "@/services/firebase/auth";
import { db } from "@/services/firebase/db";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Description from "./component/Description";
import LowerPart from "./component/LowerPart";

type Event = {
  title: string;
  date: string;
  id: string;
  description: string;
  capacity: string;
  joiners: string;
  time: string;
  authorUID: string;
};

type User = { uid: string };

export default function EventsList() {

  /*Data fetching*/ 
  const [data, setData] = useState<Event[]>([]);
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

 /*Authorizace*/
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          setUser(userData);
        } else {
          setUser(undefined);
        }
      });
    }, []);
    return user;
  };
  const user = useAuthorization();

  /*--*/ 
  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div className={styles.all}>
      <div className={styles.middlePart}>
        <div className={styles.allBoxs}>
          {data?.map((onebox) => {
            const {
              id,
              date,
              title,
              description,
              capacity,
              joiners,
              time,
              authorUID,
            } = onebox;
            return (
              <div className={styles.onebox} key={id}>
                <DateTime date={date} time={time}></DateTime>
                <Title title={title}></Title>
                <Mentor uid={authorUID}></Mentor>
                <Description description={description}></Description>
                <LowerPart joiners={joiners} capacity={capacity} authorUID={authorUID} idecko={id} ></LowerPart>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
