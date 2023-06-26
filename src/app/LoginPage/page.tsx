"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import { WhiteLogo } from "./svg/WhiteLogo";
import image from "./Image.jpg"

const page = () => {
  return (
    <div className={style.all}>
      <div className={style.footer}>
        <WhiteLogo></WhiteLogo>
      </div>
      <div className={style.middlePart}>
        <img 
        
        className={style.img}
        alt=""
        

        >

        </img>
      </div>
    </div>
  );
};

export default page;
