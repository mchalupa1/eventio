"use client";
import { use, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import style from "./page.module.css";
import { Logo } from "@/componens/svg/Logo";
import { X } from "./svg/X";
import alldata from "../data";
import { compareAsc, format, isFuture, startOfDay } from "date-fns";
import { addDays, isPast, formatISO9075 } from "date-fns";
import { db } from "@/services/firebase/db";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import { auth } from "@/services/firebase/auth";
import { useForm } from "react-hook-form";

type User = { uid: string };
const useAuthorization = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        // @ts-ignore
        setUser(userData);
        console.log(userData);
      } else {
        setUser(undefined);
      }
    });
  }, []);
  return user;
};

const Page = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  const user = useAuthorization();

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = formatISO9075(new Date(), { representation: "time" });
  const [timevalid, setTimevalid] = useState(false);

  const usersCollectionRef = collection(db, "events");

  const handle = handleSubmit(
    async ({ title, description, date, time, capacity }) => {
      const colRef = await addDoc(usersCollectionRef, {
        authorUID: user?.uid,
        title: title,
        description: description,
        date: date,
        time: time,
        capacity: capacity,
        joiners: [],
      });
      const docRef = doc(usersCollectionRef, colRef.id);
      console.log(docRef);
      await updateDoc(docRef, { id: colRef.id });
    }
  );
  return (
    <div className={style.app}>
      <ul className={style.footer}>
        <li>
          <Logo></Logo>
        </li>
        <div className={style.leftfooter}>
          <li>
            <Link href={""}>
              <X></X>
            </Link>
          </li>
          <li className={style.close}>
            <Link
              href={""}
              style={{ textDecoration: "none", color: "#323c46" }}
            >
              Close
            </Link>
          </li>
        </div>
      </ul>
      <div className={style.box}>
        <form className={style.form} autoComplete="off" onSubmit={handle}>
          <div className={style.boxfooter}>
            <span className={style.Create}>Create an account</span>
            <span className={style.info}>Enter details below</span>
          </div>

          <div className={style.inputs}>
            <input
              className={errors.title ? style.input : style.input2}
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
            <p>{errors.title?.message?.toString()}</p>
            <input
              className={errors.description ? style.input : style.input2}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be atlesat 3 characters long",
                },
                maxLength: {
                  value: 60,
                  message: "Description must be atmost 60 characters long",
                },
              })}
              placeholder="Description"
            ></input>
            <p>{errors.description?.message?.toString()}</p>
            <input
              type="date"
              className={errors.date ? style.input : style.input2}
              placeholder="Date"
              {...register("date", {
                required: "Date is required",
                // @ts-ignore
                validate: (fieldValue) => {
                  return fieldValue < currentDate
                    ? "The date is in the past"
                    : setTimevalid(true);
                },
              })}
            ></input>
            <p>{errors.date?.message?.toString()}</p>
            <input
              type="time"
              className={errors.time ? style.input : style.input2}
              {...register("time", {
                required: "Time is required",
                validate: (e) => {
                  return timevalid
                    ? true
                    : e > currentTime
                    ? true
                    : "Wrong time";
                },
              })}
              placeholder="Time"
            ></input>
            <p>{errors.time?.message?.toString()}</p>
            <input
              className={errors.capacity ? style.input : style.input2}
              type="number"
              {...register("capacity", {
                required: "Capacity is required",
                min: { value: 1, message: "Minimum is 1" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              placeholder="Capacity"
            ></input>
            <p>{errors.capacity?.message?.toString()}</p>
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

export default Page;
