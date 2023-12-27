"use client";
import { use, useRef, useState, useEffect } from "react";
import style from "./page.module.css";
import Navbar from "@/componens/Navbar/navbar";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebD1 } from "@/componens/svg2/WebD1";
import styles from "../page.module.css";
import Box from "./components/box/index";
import EventsList from "./components/Data";
type User = { fname: String; lname: String; email: String; a: String };

const Profile = () => {
  /*Grip*/
  const [grip, setGrip] = useState(true);

  return (
    <div className={style.all}>
      <Navbar></Navbar>
      <div className={styles.middlePart}>
        <div className={style.upperpart}>
          <Box></Box>
          <div className={style.mid}>
            <p className={style.events}>My Events</p>
            <ul className={style.allGrip}>
              <li
                role="button"
                className={style.grip1}
                onClick={() => {
                  setGrip(!grip);
                }}
              >
                {grip === true ? (
                  <WebDevelopment2></WebDevelopment2>
                ) : (
                  <WebD1></WebD1>
                )}
              </li>
              <li
                role="button"
                className={style.grip2}
                onClick={() => {
                  setGrip(!grip);
                }}
              >
                {grip === false ? (
                  <WebD2></WebD2>
                ) : (
                  <WebDevelopment3></WebDevelopment3>
                )}
              </li>
            </ul>
          </div>
        </div>
        <EventsList grip={grip}></EventsList>
      </div>
    </div>
  );
};

export default Profile;
