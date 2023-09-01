"use client";
import { use, useRef, useState, useEffect } from "react";
import style from "./page.module.css";
import Navbar from "@/componens/Navbar/navbar";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebDevelopment3 } from "@/componens/svg/index3";
import { WebD1 } from "@/componens/svg2/WebD1";
import styles from "../page.module.css";
import Allbox from "../AllBoxGrip/AllboxGrip";
import { Person } from "@/componens/svg/Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/db";

const Profile = () => {
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "events"));

    setData(() => {
      const data = [];

      snapshot.forEach((document) => {
        data.push(document.data());
      });

      return data;
    });

    snapshot.forEach((document) => {
      // console.log(document.data());
    });
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div className={style.all}>
      <Navbar></Navbar>
      <div className={style.allmid}>
        <div className={style.upperpart}>
          <div className={style.iconborder}>
            <p className={style.icon}>TW</p>
          </div>
          <div className={style.undericon}>
            <p className={style.name}>Tom Watts</p>
            <p className={style.email}>tomwatts@strv.com</p>
          </div>
          <div className={style.mid}>
            <p className={style.events}>My Events</p>
            <ul className={style.allGrip}>
              <li
                role="button"
                className={style.grip1}
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
                className={style.grip2}
                onClick={changeGripColor}
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
            <div className={style.allbox}>
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
                            <p className={styles.capacity}>{capacity}</p>
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
                <Allbox></Allbox>
              )}
            </div>
      </div>
    </div>
  );
};

export default Profile;
