"use client";
import BtnJoin from "./Btns/joinbtn";
import BtnLeave from "./Btns/leavebtn";
import style from "./index.module.css";
import Link from "next/link";
import { useAuthContext } from "@/app/Context/auth";
import { useRouter } from "next/navigation";

export default function BtnEvent(props: {
  author: string;
  joiners: string;
  idec: string;
  capac: string;
}) {
  const { user } = useAuthContext();
  const {push} = useRouter()

  return (
    <>
      {user && user.uid === props.author ? (
          <button className={style.statusE} onClick={() => push("/event-edit/" + props.idec)}>EDIT</button>
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
