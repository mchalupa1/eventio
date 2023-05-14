"use client";
import styles from "./page.module.css";
import Navg from "@/componens/Navg";
import alldata from "./data";
import { use, useState } from "react";
import BtnBox from "@/componens/BtnBox/BtnBox";
import { WebDevelopment } from "@/componens/svg";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebDevelopment4 } from "@/componens/svg/index4";
import { WebDevelopment5 } from "@/componens/svg/index5";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";

export default function Dashboard() {
  /*
  list grip changig color
  */
  const [grip, setgrip] = useState(true);
  const changeGripColor1 = () => {
    setgrip(!grip);
  };
  const changeGripColor2 = () => {
    setgrip(!grip);
  };

  return (
    <section className={styles.all}>
      <div className={styles.navbar}>
        <a href="/" className={styles.logo}>
          E.
        </a>
        <div className={styles.user}>
          <button className={styles.Icon}>TW</button>
          <a href="/" className={styles.client}>
            Tom Watts{" "}
            <a className={styles.scroll}>
              <WebDevelopment></WebDevelopment>
            </a>
          </a>
        </div>
      </div>
      <div className={styles.middlePart}>
        <main className={styles.categories}>
          <ul className={styles.allEV}>
            <li className={styles.categorisShow}>SHOW:</li>
            <li className={styles.alE}>ALL EVENTS<a className={styles.show}><WebD3WebD3></WebD3WebD3></a></li>
            <li className={styles.fE}>FUTURE EVENTS</li>
            <li className={styles.pE}>PAST EVENTS</li>
          </ul>
          <ul className={styles.allGrip}>
            <li
              role="button"
              className={styles.grip1}
              onClick={changeGripColor1}
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
              onClick={changeGripColor2}
            >
              {grip === false ? (
                <WebD2></WebD2>
              ) : (
                <WebDevelopment3></WebDevelopment3>
              )}
            </li>
          </ul>
        </main>
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
                  <div className={styles.boxbtn}>
                    <button
                      key={id}
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
      </div>
      <div className={styles.create}>
        <a href="/" className={styles.plus}>
          +
        </a>
      </div>
    </section>
  );
}
