"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  return (
    <div className={style.cscc}>
      <p className={style.title}>Get started absolutely free.</p>
      {errors.email ||
      errors.password ||
      errors.firstName ||
      errors.lastName ? (
        <p className={style.undertitleE}>
          Oops! That email and password combination is not valid.
        </p>
      ) : (
        <p className={style.undertitle}>Enter your details below.</p>
      )}
      <form
        className={style.form}
        onSubmit={handleSubmit((date) => console.log(date))}
        autoComplete="off"
      >
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
          className={style.INRepeatPassword}
          placeholder="Repeat Password"
          {...register("repeatPassword",{
            minLength:{
              value:6,
              message:"Oops! That email and password combination is not valid.",
            }
          })}
        ></input>
        <input type="button" className={style.btn} value="SIGN IN"></input>
      </form>
    </div>
  );
};

export default Page;
