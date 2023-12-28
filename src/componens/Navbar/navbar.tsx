"use client";
import styles from "./navbar.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { WebDevelopment } from "@/componens/svg";
import { Logo } from "@/componens/svg/Logo";
import { use, useRef, useState, useEffect, cloneElement } from "react";
import Dropmenu from "../Dropdownmenu/index";
import { auth } from "@/services/firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import Link from "next/link";

type User = { fname: String; lname: String; email: String; a: String };
const useAuthorization = () => {
  const [user, setUser] = useState<User | undefined>();

  const fetchuser = async (uid: string): Promise<User | undefined> => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data() as User;
  };

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (userData) => {
        if (userData) {
          const userFromFetch = await fetchuser(userData.uid);
          setUser(userFromFetch);
          console.log(userFromFetch);
        } else {
          setUser(undefined);
        }
      });
    };

    fetchData();
  }, []);

  return user;
};

export default function Navbar() {
  const [drop, setDrop] = useState(false);
  const Drop = () => {
    setDrop(!drop);
  };

  const user = useAuthorization();
  return (
    <>
      <div className={styles.navbar}>
        <Link href="/Dashboard" className={styles.logo}>
          <Logo></Logo>
        </Link>
        <div className={styles.user}>
          <button className={styles.Icon}>
            {user ? user.fname.charAt(0) + user.lname.charAt(0) : "..."}
          </button>
          <a className={styles.client}>
            {user ? user.fname + " " + user.lname : "Loading..."}
          </a>
          <a className={styles.scroll} onClick={Drop}>
            <WebDevelopment></WebDevelopment>
          </a>
        </div>
      </div>
      {drop ? <Dropmenu></Dropmenu> : null}
    </>
  );
}
