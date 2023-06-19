"use client";
import { use, useState } from "react";
import Link from "next/link";
import style from "./page.module.css";
import { Logo } from "@/componens/svg/Logo";
import { X } from "./svg/X";
import alldata from "../data";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  return (
    <div className={style.app}>
      <form
        className={style.form}
        autoComplete="off"
        onSubmit={handleSubmit((date) => console.log(date))}
      >
        <h2>Create an account</h2>
        <input
          className={style.input}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be atlesat 3 characters long",
            },
            maxLength: {
              value: 30,
              message: "Title must be atmost 30 characters long",
            },
          })}
          placeholder="Title"
        ></input>
        <input
          className={style.input}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 3,
              message: "Title must be atlesat 3 characters long",
            },
            maxLength: {
              value: 30,
              message: "Title must be atmost 30 characters long",
            },
          })}
          placeholder="Description"
        ></input>
        <input
          className={style.input}
          {...register("date")}
          placeholder="Date"
        ></input>
        <input
          className={style.input}
          {...register("time")}
          placeholder="Time"
        ></input>
        <input
          className={style.input}
          type="number"
          {...register("capacity", {required:"Age is reguired", min:{value:1, message:"Minimum Required age is 13"},pattern:{value:/^[0-9]*$/, message:"Only numbers are allwed"}})}
          placeholder="Capacity"
        ></input>
        <input type="Submit"></input>
      </form>
    </div>
  );
};

export default page;
