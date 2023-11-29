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
  updateDoc,
  setDoc,
  runTransaction,
  DocumentReference,
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
import { format, formatISO9075 } from "date-fns";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { number, string } from "yup";
import { useRouter } from "next/navigation";
import BtnEvent from "@/componens/BtnEvent/page";

type Event = {
  title: string;
  date: string;
  id: string;
  mentor: string;
  description: string;
  capacity: string;
  status: string;
  joiners: string;
  time: string;
  author: DocumentReference;
  authorUID: string;
};

type User1 = {
  fname: string;
  lname: string;
  id: string;
};
export default function Dashboard() {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = formatISO9075(new Date(), { representation: "time" });
  const { push } = useRouter();

  const [droplist, setdroplist] = useState(true);

  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };

  const [data, setData] = useState<Event[]>([]);
  const fetchData = async () => {
    const colRef = collection(db, "events");
    onSnapshot(colRef, async (snapshot) => {
      const data: Event[] = [];
      const data2: Event[] = [];

      snapshot.forEach((document) => {
        // @ts-ignore

        const foo = document.data();
        /*
          if (foo.author) {
             const foo2 = await getDoc(foo.author)
             console.log(foo2.data())
          }
          */
        data.push(foo);
      });

      for await (const foo3 of data) {
        const foo2 = await getDoc(foo3.author);
        data2.push({ ...foo3, author: foo2.data() });
      }

      setData(data2);
    });
  };

  const FutureEvents = () => {
    const colRef = collection(db, "events");
    onSnapshot(colRef, (snapshot) => {
      setData(() => {
        const data: Event[] = [];

        snapshot.forEach((document) => {
          // @ts-ignore
          data.push(document.data());
        });

        const result = data.filter((item) => item.date > currentDate);
        console.log(data.forEach((item) => item.date));

        return result;
      });
    });
  };

  const PastEvents = () => {
    const colRef = collection(db, "events");
    onSnapshot(colRef, (snapshot) => {
      setData(() => {
        const data: Event[] = [];

        snapshot.forEach((document) => {
          // @ts-ignore
          data.push(document.data());
        });

        const result = data.filter((item) => item.date < currentDate);

        return result;
      });
    });
  };

  console.log(data);

  type User = { uid: string };
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          // @ts-ignore
          setUser(userData);
        } else {
          setUser(undefined);
        }
      });
    }, []);
    return user;
  };
  const user = useAuthorization();

  const status = () => {
    data.forEach(async (item) => {
      const docRef = doc(db, "events", item.id);
      if (item.authorUID == user?.uid) {
        await updateDoc(docRef, { status: "EDIT" });
      } else if (user?.uid.includes(item.joiners)) {
        await updateDoc(docRef, { status: "LEAVE" });
      } else {
        await updateDoc(docRef, { status: "JOIN" });
      }
    });
  };
  status();

  const ButtonChangeStatus = async (id: string) => {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as Event;
    if (data.status === "JOIN") {
      if (data?.joiners && user?.uid) {
        let updatedJoiners = [...data.joiners];

        if (!data.joiners.includes(user.uid)) {
          updatedJoiners = [...updatedJoiners, user.uid];
        }
        if (docRef) {
          await updateDoc(docRef, { joiners: updatedJoiners });
        }
      }
      status();
    } else {
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);
  console.log(data[0]?.author);
  return (
    <section className={styles.all}>
      <Navbar></Navbar>
      <div className={styles.middlePart}>
        <main className={styles.categories}>
          <ul className={styles.allEV}>
            <li className={styles.categorisShow}>SHOW:</li>
            <li className={styles.alE} onClick={fetchData}>
              ALL EVENTS
              <a className={styles.show} onClick={() => setdroplist(!droplist)}>
                <WebD3WebD3></WebD3WebD3>
              </a>
            </li>
            <li className={styles.fE} onClick={FutureEvents}>
              FUTURE EVENTS
            </li>
            <li className={styles.pE} onClick={PastEvents}>
              PAST EVENTS
            </li>
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
                authorUID,
              } = onebox;
              return (
                <div className={styles.onebox} key={id}>
                  <div className={styles.alltime}>
                    <p className={styles.date}>
                      {format(new Date(date), "LLLL d, y ")} – {time}
                    </p>
                  </div>
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.mentor}>
                    {author.fname + " " + author.lname}
                  </p>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.lower}>
                    <div className={styles.PesronCapacity}>
                      {" "}
                      <Person></Person>
                      <p className={styles.capacity}>
                        {joiners.length} of {capacity}
                      </p>
                      
                    </div>
                    <div className={styles.boxbtn}>
                      <BtnEvent author={authorUID}
                      joiners={joiners}
                      idecko ={id}
                      
                      ></BtnEvent>
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
