"use client";
import styles from "./navbar.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { WebDevelopment } from "@/componens/svg";
import { Logo } from "@/componens/svg/Logo";
import { use, useRef, useState, useEffect, cloneElement } from "react";
import Dropmenu from "../Dropdownmenu/index";
import { auth } from "@/services/firebase/auth";
import { getDoc, collection, doc } from "firebase/firestore";
import { db } from "@/services/firebase/db";

type User = { fname: String; lname: String; email: String , a:String};
const useAuthorization = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        // @ts-ignore
        setUser(userData);
        fetchuser(userData.uid);
        console.log(userData);
      } else {
        setUser(undefined);
      }
    });
    const fetchuser = async (uid: string): Promise<User | undefined> => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      // @ts-ignore
      setUser(docSnap.data());
      return docSnap.data() as User;
    };
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
          <button className={styles.Icon}>{"nwm"}</button>
          <a href="/" className={styles.client}>
            {user?.fname + " "}
            {user?.lname}
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
