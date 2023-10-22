"use client";
import { Key, cloneElement, useEffect, useId } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/services/firebase/db";
import Link from "next/link";
import styles from "./page.module.css";
import alldata from "./data";
import Droplist from "../componens/Droplist/index";
import { use, useRef, useState } from "react";
import { WebDevelopment } from "@/componens/svg";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import Allboxgrip from "./AllBoxGrip/AllboxGrip";
import { Person } from "@/componens/svg/Person";
import { Logo } from "@/componens/svg/Logo";
import Navbar from "@/componens/Navbar/navbar";
import { format } from "date-fns";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

type Event = {
  title: string;
  date: string;
  id: Key;
  mentor: string;
  description: string;
  capacity: string;
  status: string;
  joiners: string;
  time: string;
  author: string;
};

type User = {
  fname: string;
  lname: string;
  id: string;
};
export default function Dashboard() {
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
      setData(() => {
        const data: Event[] = [];

        snapshot.forEach((document) => {
          // @ts-ignore
          data.push(document.data());
        });

        return data;
      });
    });
    
  };

  const [name, setName] = useState<User[]>([]);
  const Getmentor = async () => {
    data.forEach(async (item) => {
      const docRef = doc(db, "users", item.author);
      const docSnap = await getDoc(docRef);
    });
  };

  type User = { uid: string };
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          // @ts-ignore
          setUser(userData);
          console.log(userData);
        } else {
          setUser(undefined);
        }
      });
    }, []);
    return user;
  };
  const user = useAuthorization();

  const status = () => {
    data.forEach((item) => {
      if (item.author == user?.uid) {
        return (item.status = "EDIT");
      } else if (user?.uid.includes(item.joiners) === false) {
        return (item.status = "LEAVE");
      } else {
        return (item.status = "JOIN");
      }
    });
  };
  status()

  const ButtonChangeStatus = () => {
    console.log()
  };

  useEffect(() => {
    void fetchData();
    Getmentor();
    
  },[]);


  

  return (
    <section className={styles.all}>
      <Navbar></Navbar>
      <div className={styles.middlePart}>
        <main className={styles.categories}>
          <ul className={styles.allEV}>
            <li className={styles.categorisShow}>SHOW:</li>
            <li className={styles.alE}>
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
          <div className={styles.allBoxs}>
            {data?.map((onebox) => {
              const {
                id,
                date,
                title,
                mentor,
                description,
                capacity,
                status,
                joiners,
                time,
                author,
              } = onebox;
              return (
                <div className={styles.onebox} key={id}>
                  <div className={styles.alltime}>
                    <p className={styles.date}>
                      {date} – {time}
                    </p>
                  </div>
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.mentor}>{author}</p>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.lower}>
                    <div className={styles.PesronCapacity}>
                      {" "}
                      <Person></Person>
                      <p className={styles.capacity}>
                        {"0"} of {capacity}
                      </p>
                      <p></p>
                    </div>
                    <div className={styles.boxbtn}>
                      <button
                        onClick={() => ButtonChangeStatus()}
                        className={
                          status === "JOIN"
                            ? styles.statusJ
                            : status === "LEAVE"
                            ? styles.statsuL
                            : styles.statusE
                        }
                      >
                        {status}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
