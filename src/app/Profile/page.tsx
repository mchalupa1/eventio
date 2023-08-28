"use client";
import { use, useRef, useState } from "react";
import style from "./page.module.css";
import Navbar from "@/componens/Navbar/navbar";

const Profile = () => {
  return (
    <div className={style.all}>
      <Navbar></Navbar>
      <div className={style.allmid}>
        <div className={style.upperpart}>
          <div className={style.iconborder}>
            <p className={style.icon}>TW</p>
          </div>
          <div className={style.undericon}>
            <p className={style.name}>Tom Watts</p>
            <p className={style.email}>tomwatts@strv.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
