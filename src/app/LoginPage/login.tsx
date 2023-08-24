"use client";
import { use, useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Eye from "./svg/Eye.svg";

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
    <div>
          <p className={style.title}>Sign in to Eventio.</p>
          {errors.email || errors.password ? (
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
              type={eye? "password": "text"}
              placeholder="Password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message:
                    "Oops! That email and password combination is not valid.",
                },
              })}
            ></input>

            <label className={style.eye} onClick={() => seteye(!eye)}><Eye></Eye></label>
          
            <input type="button" className={style.btn} value="SIGN IN"></input>
          </form>
    </div>
  );
};

export default Page;
