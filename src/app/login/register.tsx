"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase/auth";
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import firebase from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const Page = () => {
  const auth = getAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setError,
  } = useForm({
    mode: "all",
  });
  const { push } = useRouter();
  const singin = handleSubmit(
    
    async ({ email, password, firstName, lastName }) => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = user.user.uid
        console.log(uid)
        const create = await setDoc(doc(db,"users",uid), {fname:firstName, lname:lastName, email:email})
        push("/");
      } catch (error) {
        console.log(error);
      }
    }
     
  );
  return (
    <div className={style.box}>
      <p className={style.title}>Get started absolutely free.</p>
      {errors.email ||
      errors.repeatPassword ||
      errors.password ||
      errors.firstName ||
      errors.lastName ? (
        <p className={style.undertitleE}>
          Oops! That email and password combination is not valid.
        </p>
      ) : (
        <p className={style.undertitle}>Enter your details below.</p>
      )}
      <form className={style.form} onSubmit={singin} autoComplete="off">
        <input
          className={style.INfirstname}
          placeholder="First name"
          {...register("firstName", {
            minLength: {
              value: 3,
              message:
                "Oops! That email and password combination is not valid.",
            },
          })}
        ></input>
        <input
          className={style.INlastname}
          placeholder="Last name"
          {...register("lastName", {
            minLength: {
              value: 3,
              message:
                "Oops! That email and password combination is not valid.",
            },
          })}
        ></input>
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
          type="password"
          className={style.INPassword}
          placeholder="Password"
          {...register("password", {
            minLength: {
              value: 6,
              message:
                "Oops! That email and password combination is not valid.",
            },
          })}
        ></input>
        <input
          type="password"
          className={style.INRepeatPassword}
          placeholder="Repeat Password"
          {...register("repeatPassword", {
            minLength: {
              value: 6,
              message:
                "Oops! That email and password combination is not valid.",
            },
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        <input type="submit" className={style.btn} value="SIGN IN"></input>
      </form>
    </div>
  );
};

export default Page;