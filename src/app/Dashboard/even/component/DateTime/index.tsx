"use client";
import style from "./index.module.css";
import { format } from "date-fns";

export default function DateTime(props: { date: string; time: string }) {
  return (
    <div className={style.alltime}>
      <p className={style.date}>
        {format(new Date(props.date), "LLLL d, y ")} – {props.time}
      </p>
    </div>
  );
}
