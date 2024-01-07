"use client";
import style from "./index.module.css";
import BtnEvent from "../BtnEvent/index"

export default function LowerPart(props: {
  grip: boolean;
  joiners: string;
  capacity: string;
  authorUID: string;
  idecko: string;
}) {
  return (
    <>
      <p className={style.capacity}>
        {props.joiners.length} of {props.capacity}
      </p>
      <div className={style.boxbtn}>
        <BtnEvent
          author={props.authorUID}
          joiners={props.joiners}
          idec={props.idecko}
          capac={props.capacity}
        ></BtnEvent>
      </div>
    </>
  );
}