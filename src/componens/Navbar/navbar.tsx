"use client";
import styles from "./navbar.module.css";
import { onAuthStateChanged, type User } from "firebase/auth";
import { WebDevelopment } from "@/componens/svg";
import { Logo } from "@/componens/svg/Logo";
import { use, useRef, useState, useEffect, cloneElement } from "react";
import Dropmenu from "../Dropdownmenu/index";
import { auth } from "@/services/firebase/auth";
import { getDocs, collection,  } from "firebase/firestore";
import { db } from "@/services/firebase/db";


const useAuthorization = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {

    onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else setUser(undefined);
    });
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
        <a href="/" className={styles.logo}>
          <Logo></Logo>
        </a>
        <div className={styles.user}>
          <button className={styles.Icon}>TW</button>
          <a href="/" className={styles.client}>
            {user?.email}
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