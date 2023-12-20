"use client";
import style from "./index.module.css";


export default function Description(props:{description:string}) {
  return (
    <>
      <p className={style.description}>{props.description}</p>
    </>
  );
}
