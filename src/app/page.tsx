"use client";
import Link from "next/link";
import styles from "./page.module.css";
import alldata from "./data";
import { use, useState } from "react";
import { WebDevelopment } from "@/componens/svg";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import Allboxgrip from "./AllBoxGrip/AllboxGrip";
import { Person } from "@/componens/svg/Person";
import { Logo } from "@/componens/svg/Logo";

export default function Dashboard() {
  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };
  /**/

  return (
    <section className={styles.all}>
      <div className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <Logo></Logo>
        </a>
        <div className={styles.user}>
          <button className={styles.Icon}>TW</button>
          <a href="/" className={styles.client}>Tom Watts</a>
          <a className={styles.scroll}>
          <WebDevelopment></WebDevelopment>
          </a>
        </div>
      </div>
      <div className={styles.middlePart}>
        <main className={styles.categories}>
          <ul className={styles.allEV}>
            <li className={styles.categorisShow}>SHOW:</li>
            <li className={styles.alE}>
              ALL EVENTS
              <a className={styles.show}>
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
        {grip === true ? (
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
                    <div className={styles.PesronCapacity}>
                      {" "}
                      <Person></Person>
                      <p className={styles.capacity}>{capacity}</p>
                    </div>
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
