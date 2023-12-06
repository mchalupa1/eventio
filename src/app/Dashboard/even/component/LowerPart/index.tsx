"use client";
import { Person } from "@/componens/svg/Person";
import style from "./index.module.css";
import BtnEvent from "@/componens/BtnEvent/page";

export default function LowerPart(props:{joiners:string, capacity:string, authorUID:string, idecko:string}) {
  return (
    <div className={style.lower}>
      <div className={style.PesronCapacity}>
        {" "}
        <Person></Person>
        <p className={style.capacity}>
          {props.joiners.length} of {props.capacity}
        </p>
      </div>
      <div className={style.boxbtn}>
        <BtnEvent
          author={props.authorUID}
          joiners={props.joiners}
          idecko={props.idecko}
          capac={props.capacity}
        ></BtnEvent>
      </div>
    </div>
  );
}
