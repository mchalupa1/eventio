"use client";
import style from "./index.module.css"
  export default function Title(props:{title:string}) {
  return (
    <>
      <h1 className={style.title}>{props.title}</h1>
    </>
  );
}
