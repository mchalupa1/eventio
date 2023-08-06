"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import { WhiteLogo } from "./svg/WhiteLogo";
import Image from "next/image";
import image from "./svg/image.jpg";
import Link from "next/link";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });


  return (
    <div className={style.all}>
      <div className={style.footer}>
        <WhiteLogo></WhiteLogo>
        <div className={style.Account}>
        <p className={style.dont}>
        Don’t have account? 
        </p>
        <Link href={"/"}  className= {style.singup}>SIGN UP</Link>
        </div>
      </div>
      <div className={style.middlePart}>
        <div className={style.img}></div>
        <div className={style.loginBox}>
          <p className={style.title}>Sign in to Eventio.</p>
          <p className={style.undertitle}>Enter your details below.</p>
          <div className={style.form}>
            <input className={style.INEmail}>
            </input>
            <input className={style.INPassword}>
            </input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
