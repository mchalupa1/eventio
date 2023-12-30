"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import Image from "next/image";
import image2 from "./svg/273ad2cb59513e9290e4bbabe5b3bcb2.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Login from "./login";
import Register from "./register";
import { Logo } from "@/componens/svg/Logo";

const Page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const [eye, seteye] = useState(true);
  const [LoginBox, setLoginBox] = useState(true);

  return (
    <main className={style.all}>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Logo></Logo>
        </div>
        <div className={style.Account}>
          {LoginBox ? (
            <p className={style.dont}>Don’t have account?</p>
          ) : (
            <p className={style.already}>Already have an account?</p>
          )}
          <p className={style.singup} onClick={() => setLoginBox(!LoginBox)}>
            {LoginBox ? "SIGN UP" : "SING IN"}
          </p>
        </div>
      </nav>
      <div className={style.middlePart}>
        {LoginBox ? <Login></Login> : <Register></Register>}
      </div>
    </main>
  );
};

export default Page;

