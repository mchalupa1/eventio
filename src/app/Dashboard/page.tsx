"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import Link from "next/link";
import styles from "./page.module.css";
import Droplist from "../componens/Droplist/index";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import Allboxgrip from "./AllBoxGrip/AllboxGrip";
import { Person } from "@/componens/svg/Person";
import Navbar from "@/componens/Navbar/navbar";
import { format, formatISO9075 } from "date-fns";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import BtnEvent from "@/componens/BtnEvent/page";
import Mentor from "@/app/Dashboard/even/component/Mentor";
import EventsList from "./even";

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

export default function Page() {
  const { push } = useRouter();

  /*droplist*/
  const [droplist, setdroplist] = useState(true);

  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };

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
    <section className={styles.all}>
      <Navbar></Navbar>
      <div className={styles.middlePart}>
        <main className={styles.categories}>
          <ul className={styles.allEV}>
            <li className={styles.categorisShow}>SHOW:</li>
            <li className={styles.alE} onClick={fetchData}>
              ALL EVENTS
              <a className={styles.show} onClick={() => setdroplist(!droplist)}>
                <WebD3WebD3></WebD3WebD3>
              </a>
            </li>
            <li className={styles.fE}>FUTURE EVENTS</li>
            <li className={styles.pE}>PAST EVENTS</li>
          </ul>
          <ul className={styles.allGrip}>
            <li
              role="button"
              className={styles.grip1}
              onClick={changeGripColor}
            >
              {grip === true ? (
                <WebDevelopment2></WebDevelopment2>
              ) : (
                <WebD1></WebD1>
              )}
            </li>
            <li
              role="button"
              className={styles.grip2}
              onClick={changeGripColor}
            >
              {grip === false ? (
                <WebD2></WebD2>
              ) : (
                <WebDevelopment3></WebDevelopment3>
              )}
            </li>
          </ul>
        </main>
        {droplist === false ? <Droplist></Droplist> : droplist}
        {grip === true ? (
          <EventsList></EventsList>
        ) : (
          <Allboxgrip></Allboxgrip>
        )}
      </div>
      <div className={styles.create}>
        <Link href="createevent" className={styles.plus}>
          +
        </Link>
      </div>
    </section>
  );
}
