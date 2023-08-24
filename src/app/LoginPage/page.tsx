"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import { WhiteLogo } from "./svg/WhiteLogo";
import Image from "next/image";
import image2 from "./svg/273ad2cb59513e9290e4bbabe5b3bcb2.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Login from "./login"
import Register from "./register"

const Page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });


  const [eye, seteye] = useState(true)
const [LoginBox, setLoginBox] = useState(true)


  return (
    <div className={style.all}>
      <div className={style.footer}>
        <WhiteLogo></WhiteLogo>
        <div className={style.Account}>
          {LoginBox? <p className={style.dont}>Don’t have account?</p>: <p className={style.already}>Already have an account?</p>}
          <p className={style.singup} onClick={() => setLoginBox(!LoginBox)}>
            SIGN UP
          </p>
        </div>
      </div>
      <div className={style.middlePart}>
        <Image alt="SOLO" src={image2} className={style.img}></Image>
        <div className={style.loginBox}>
          {
            LoginBox?<Login></Login>:<Register></Register>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
