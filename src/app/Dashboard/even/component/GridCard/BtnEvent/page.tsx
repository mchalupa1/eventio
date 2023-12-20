"use client";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import BtnJoin from "./Btns/joinbtn";
import BtnLeave from "./Btns/leavebtn";
import style from "./page.module.css";

const BtnEvent = (props: {
  author: string;
  joiners: string;
  idecko: string;
  capac: string;
}) => {
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
    <div>
      {user?.uid === props.author ? (
        <button className={style.statusE}>EDIT</button>
      ) : props.joiners.includes(user?.uid as string) ? (
        <BtnLeave
          uid={user?.uid as string}
          joiners={props.joiners}
          id={props.idecko}
        ></BtnLeave>
      ) : (
        <BtnJoin
          uid={user?.uid as string}
          joiners={props.joiners}
          id={props.idecko}
          capac={props.capac}
        ></BtnJoin>
      )}
    </div>
  );
};

export default BtnEvent;
