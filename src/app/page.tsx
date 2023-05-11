'use client'
import styles from "./page.module.css";
import Navg from "@/componens/Navg";
import alldata from "./data";
import { useState } from "react";

export default function Dashboard() {
 const upnumber = () =>{
  console.log("HI")
 }
  return (
    <section className={styles.all}>
      <div className={styles.navbar}>
        <a href="/" className={styles.logo}>
          E.
        </a>
        <div className={styles.user}>
          <button className={styles.Icon}>TW</button>
          <a href="/" className={styles.client}>
            Tom Watts
          </a>
        </div>
      </div>
      <div className={styles.categories}>
        <ul className={styles.allEV}>
          <li className={styles.alE}>ALL EVENTS</li>
          <li className={styles.fE}>FUTURE EVENTS</li>
          <li className={styles.pE}>PAST EVENTS</li>
        </ul>
        <ul className={styles.allGrip}>
          <li className={styles.grip1}>X</li>
          <li className={styles.grip2}>X</li>
        </ul>
      </div>
      <div className={styles.allBoxs}>
        {alldata.map((onebox) => {
          const { id, date, title, mentor, description, capacity, status } =
            onebox;
          return (
            <div className={styles.onebox} key={id}>
              <p className={styles.date}>{date}</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.mentor}>{mentor}</p>
              <p className={styles.description}>{description}</p>
              <div className={styles.lower}>
                <p className={styles.capacity}>{capacity}</p>

                <button onClick={upnumber}
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
          );
        })}
      </div>
      <div className={styles.create}>
        <div className={styles.plus2}>
          <p>.</p>
        </div>
        <button className={styles.plus}>+</button>
      </div>
    </section>
  );
}
