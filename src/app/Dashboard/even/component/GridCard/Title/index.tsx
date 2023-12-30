"use client";
import style from "./index.module.css"

  export default function Title(props:{title:string, grip:boolean}) {
  return (
    <>
    
      <h1 className={props.grip?style.title :style.title2}>{props.title}</h1>
    
      
    </>
  );
}
