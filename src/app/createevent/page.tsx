"use client";
import { use, useState } from "react";
import Link from "next/link";
import style from "./page.module.css";
import { Logo } from "@/componens/svg/Logo";
import { X } from "./svg/X";
import alldata from "../data";
import { compareAsc, format, startOfDay } from 'date-fns'

import { useForm } from "react-hook-form";

const page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });
 
  const 
 
  return (
    <div className={style.app}>
      <ul className={style.footer}>
        <li>
          <Logo></Logo>
        </li>
        <div className={style.leftfooter}>
          <li>
           <X></X>
          </li>
          <li className={style.close}>Close</li>
        </div>
      </ul>
      <div className={style.box}>
        <form
          className={style.form}
          autoComplete="off"
          onSubmit={handleSubmit((date) => console.log(date))}
        >
          <div className={style.boxfooter}>
            <span className={style.Create}>Create an account</span>
            <span className={style.info}>Enter details below</span>
          </div>

          <div className={style.inputs}>
            
            <input
              className={(errors.title)? style.input : style.input2}
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
          
            <p>{errors.title?.message}</p>
            <input
              className={(errors.description)? style.input : style.input2}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be atlesat 3 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Description must be atmost 40 characters long",
                },
              })}
              placeholder="Description"
            ></input>
            <p>{errors.description?.message}</p>
            <input
              onFocus={(e) => (e.target.type = "date")}
              type="text"
              className={(errors.date)? style.input : style.input2}
              {...register("date")}
              placeholder="Date"
            ></input>
            <p>{errors.date?.message}</p>
            <input
              onFocus={(e) => (e.target.type = "time")}
              type="text"
              className={(errors.time)? style.input : style.input2}
              {...register("time")}
              placeholder="Time"
            ></input>
            <p>{errors.time?.message}</p>
            <input
              className={(errors.capacity)? style.input : style.input2}
              type="number"
              {...register("capacity", {
                required: "Capacity is reguired",
                min: { value: 1, message: "Minimum is 1" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allwed",
                },
              })}
              placeholder="Capacity"
            ></input>
            <p>{errors.capacity?.message}</p>
            <input
              type="Submit"
              className={style.submit}
              value="CREATE NEW EVENT"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
