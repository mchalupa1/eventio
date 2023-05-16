"use client";
import Link from "next/link";
import { use, useState } from "react";
import style from "./page.module.css";
import { Logo } from "@/componens/svg/Logo";
import { X } from "./svg/X";

const page = () => {
  return (
    <>
      <div className={style.all}>
        <div className={style.navbar}>
          <p className={style.logo}>
            <Logo></Logo>
          </p>
          <div className={style.close}>
            <Link href="" className={style.X}>X</Link>
            <Link href ="" className={style.CloseL}>Close</Link>
          </div>
        </div>
        <div className={style.allbox}>
          <div className={style.box}>
            <p className={style.title}>Create new event</p>
            <p className={style.details}>Enter details below</p>
            <div className={style.forms}>
              <input
                type="text"
                name="fname"
                placeholder="Title"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Description"
                className={style.oneform}
              ></input>
              <input
                name="fname"
                placeholder="Date"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Time"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Capacity"
                className={style.oneform}
              ></input>
            </div>
            <button className={style.createbtn}>CREATE NEW EVENT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
