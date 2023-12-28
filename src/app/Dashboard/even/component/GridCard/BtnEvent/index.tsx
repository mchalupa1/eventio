"use client";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import BtnJoin from "./Btns/joinbtn";
import BtnLeave from "./Btns/leavebtn";
import style from "./index.module.css";
import Link from "next/link";

export default function BtnEvent(props: {
  author: string;
  joiners: string;
  idec: string;
  capac: string;
}) {
  type User = { uid: string };
  /*Authorizace*/
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          setUser(userData);
        } else {
          setUser(undefined);
        }
      });
    }, []);
    return user;
  };
  const user = useAuthorization();

  return (
    <>
      {user && user.uid === props.author ? (
        <Link href="/createevent" style={{ textDecoration: "none" }}>
          <button className={style.statusE}>EDIT</button>
        </Link>
      ) : props.joiners.includes(user?.uid as string) ? (
        <BtnLeave
          uid={user?.uid as string}
          joiners={props.joiners}
          id={props.idec}
        />
      ) : (
        <BtnJoin
          uid={user?.uid as string}
          joiners={props.joiners}
          id={props.idec}
          capac={props.capac}
        />
      )}
    </>
  );
}
