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

export default function Dashboard() {
  const [grip1, setgrip1] = useState(true);
  const [grip2, setgrip2] = useState(true);
  const changeGripColor1 = () => {
    setgrip1(!grip1);
  };
  const changeGripColor2 = () => {
    setgrip2(!grip2);
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
            <li className={styles.alE}>ALL EVENTS</li>
            <li className={styles.fE}>FUTURE EVENTS</li>
            <li className={styles.pE}>PAST EVENTS</li>
          </ul>
          <ul className={styles.allGrip}>
            <li
              role="button"
              className={styles.grip1}
              onClick={changeGripColor1}
            >
              {grip1 === true ? (
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
              {grip2 === true ? (
                <WebDevelopment3></WebDevelopment3>
              ) : (
                <WebD2></WebD2>
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
        <div className={styles.plus2}>
          <p>.</p>
        </div>
        <a href="/" className={styles.plus}>
          <WebDevelopment5></WebDevelopment5>
        </a>
      </div>
    </section>
  );
}
