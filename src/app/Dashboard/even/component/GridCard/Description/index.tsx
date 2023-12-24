"use client";
import style from "./index.module.css";


export default function Description(props:{grip:boolean,description:string}) {
  return (
    <>
      <p className={props.grip? style.description:style.description2}>{props.description}</p>
    </>
  );
}
