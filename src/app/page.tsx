"use client";
import { Key, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
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

type Event = {
  title: String;
  date: String;
  id: Key;
  mentor: String;
  description: String;
  capacity: String;
  status: String;
  joiners: String;
};
export default function Dashboard() {
  const [data, setData] = useState<Event[]>([]);
  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };

  const [droplist, setdroplist] = useState(true);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "events"));
  
    setData(() => {
      const data: Event[] = [];

      snapshot.forEach((document) => {
        // @ts-ignore
        data.push(document.data());
      });

      return data;
    });

    snapshot.forEach((document) => {
      console.log(document.data().title);
    });
  };

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
              } = onebox;
              return (
                <div className={styles.onebox} key={id}>
                  <p className={styles.date}>{date}</p>
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.mentor}>{mentor}</p>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.lower}>
                    <div className={styles.PesronCapacity}>
                      {" "}
                      <Person></Person>
                      <p className={styles.capacity}>
                        {joiners} of {capacity}
                      </p>
                      <p></p>
                    </div>
                    <div className={styles.boxbtn}>
                      <button
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
