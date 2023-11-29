"use client";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import BtnJoin from "../Btns/joinbtn";
import BtnLeave from "../Btns/leavebtn";

type Btn = {
  props: {
    auth: string;
  };
};

const BtnEvent = (props: { author: string; joiners: string, idecko:string }) => {
  type User = { uid: string };
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          // @ts-ignore
          setUser(userData);
          console.log(userData);
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
        <button>Edit</button>
      ) : props.joiners.includes(user?.uid as string) ? (
         <BtnLeave uid={user?.uid as string} joiners={props.joiners} id={props.idecko}></BtnLeave>
      ) : (
        <BtnJoin uid={user?.uid as string} joiners={props.joiners} id={props.idecko}></BtnJoin>
      )}
    </div>
  );
};

export default BtnEvent;
