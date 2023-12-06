"use client";
import BtnEvent from "@/componens/BtnEvent/page";
import Mentor from "@/app/Dashboard/even/component/Mentor";
import { Person } from "@/componens/svg/Person";
import styles from "./page.module.css";
import { auth } from "@/services/firebase/auth";
import { db } from "@/services/firebase/db";
import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
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

export default function Dashboard() {
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

  type User = { uid: string };
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
                <div className={styles.alltime}>
                  <p className={styles.date}>
                    {format(new Date(date), "LLLL d, y ")} – {time}
                  </p>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <Mentor uid={authorUID}></Mentor>
                <p className={styles.description}>{description}</p>
                <div className={styles.lower}>
                  <div className={styles.PesronCapacity}>
                    {" "}
                    <Person></Person>
                    <p className={styles.capacity}>
                      {joiners.length} of {capacity}
                    </p>
                  </div>
                  <div className={styles.boxbtn}>
                    <BtnEvent
                      author={authorUID}
                      joiners={joiners}
                      idecko={id}
                      capac={capacity}
                    ></BtnEvent>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
