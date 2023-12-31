"use client";
import BtnJoin from "./Btns/joinbtn";
import BtnLeave from "./Btns/leavebtn";
import style from "./index.module.css";
import Link from "next/link";
import { useAuthContext } from "@/app/Context/auth";

export default function BtnEvent(props: {
  author: string;
  joiners: string;
  idec: string;
  capac: string;
}) {
  const { user } = useAuthContext();

  return (
    <>
      {user && user.uid === props.author ? (
        <Link href={"/createevent"}>
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
