"use client";
import { useState, useEffect } from "react";
import style from "./index.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/db";

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

const Box = () => {
  const user = useAuthorization();
  return (
    <>
      <div className={style.iconborder}>
        <p className={style.icon}>
          {user ? user.fname.charAt(0) + " " + user.lname.charAt(0): "..."  }
        </p>
      </div>
      <div className={style.undericon}>
        <p className={style.name}>
          {user ? user.fname + " " + user.lname : "Loading..."}
        </p>
        <p className={style.email}>{user? user?.email:"Loading..."}</p>
      </div>
    </>
  );
};

export default Box;
