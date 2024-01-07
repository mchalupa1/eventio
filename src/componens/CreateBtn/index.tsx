"use client";
import Link from "next/link";
import style from "./index.module.css"

export default function CreateBtn() {
  return (
    <div className={style.create}>
        <Link href="createevent" className={style.plus}>
          +
        </Link>
      </div>
  );
}
