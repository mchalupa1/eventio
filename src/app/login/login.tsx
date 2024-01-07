"use client";
import { use, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import style from "./page.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Eye from "./svg/Eye.svg";

import { auth } from "@/services/firebase/auth";

const Page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm({
    mode: "all",
  });
  const { push } = useRouter();

  const [eye, seteye] = useState(true);
  const [LoginBox, setLoginBox] = useState(true);

  const submit = handleSubmit(async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      push("/");

      console.log(user);
    } catch (error) {
      setError("email", { message: "problem" });
    }
  });

  return (
    <div className={style.box}>
      <p className={style.title}>Sign in to Eventio.</p>
      {errors.email || errors.password ? (
        <p className={style.undertitleE}>
          Oops! That email and password combination is not valid.
        </p>
      ) : (
        <p className={style.undertitle}>Enter your details below.</p>
      )}
      <form className={style.form} onSubmit={submit} autoComplete="off">
        <input
          className={style.INEmail}
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message:
                "Oops! That email and password combination is not valid.",
            },
          })}
        ></input>
        <input
          className={style.INPassword}
          type={eye ? "password" : "text"}
          placeholder="Password"
          {...register("password", {
            minLength: {
              value: 6,
              message:
                "Oops! That email and password combination is not valid.",
            },
          })}
        ></input>
        <input type="submit" className={style.btn} value="SIGN IN"></input>
      </form>
    </div>
  );
};

export default Page;
