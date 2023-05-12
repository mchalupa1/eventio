"use client";
import styles from "./page.module.css";
import Navg from "@/componens/Navg";
import alldata from "./data";
import { use, useState } from "react";
import BtnBox from "@/componens/BtnBox/BtnBox";
import { WebDevelopment } from "@/componens/svg";
import { WebDevelopment2 } from "@/componens/svg/index2";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebDevelopment4 } from "@/componens/svg/index4";

export default function Dashboard() {
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
            <li className={styles.grip1}>
              <WebDevelopment2></WebDevelopment2>
            </li>
            <li className={styles.grip2}>
              <WebDevelopment3></WebDevelopment3>
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
        <a href="/" className={styles.plus}>+</a>
      </div>
      <WebDevelopment4></WebDevelopment4>
    </section>
  );
}
