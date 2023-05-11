import Image from "next/image";
import styles from "./page.module.css";
import Navg from "@/componens/Navg";
import alldata from "./data";
import { useState } from "react";

export default function Home() {
  return (
    <section>
      <div className="navbar">
        <a href="/">E.</a>
        <div className="user">
          <a href="/">TW</a>
          <a href="/">Tom Watts</a>
        </div>
      </div>
      <div className="all-boxs">
        {alldata.map((onebox) => {
          const { id, date, title, mentor, description } = onebox;
          return (
            <div className={styles.onebox} key={id}>
              <p>{date}</p>
              <h1>{title}</h1>
              <p>{mentor}</p>
              <p>{description}</p>
              <div className="lower">
                <button>Join</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="create">
        <a href="/" className={styles.create}>
          X
        </a>
      </div>
    </section>
  );
}
