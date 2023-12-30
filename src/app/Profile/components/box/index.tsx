"use client";
import style from "./index.module.css";
import { useAuthContext } from "@/app/Context/auth";

const Box = () => {
  const {user} = useAuthContext()
  return (
    <>
      <div className={style.iconborder}>
        <p className={style.icon}>
          {user ? user.fname.charAt(0) + " " + user.lname.charAt(0): "..."  }
        </p>
      </div>
      <div className={style.undericon}>
        <p className={style.name}>
          {user ? user.fname + " " + user.lname : "Loading..."}
        </p>
        <p className={style.email}>{user? user?.email:"Loading..."}</p>
      </div>
    </>
  );
};

export default Box;
