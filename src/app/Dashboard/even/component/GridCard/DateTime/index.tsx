"use client";
import style from "./index.module.css";
import { format } from "date-fns";

export default function DateTime(props: {grip:boolean, date: string; time: string }) {
  return (
    <div className={props.grip? style.alltime:style.alltime2}>
      <p className={props.grip? style.date: style.date2}>
        {format(new Date(props.date), "LLLL d, y ")} – {props.time}
      </p>
    </div>
  );
}
