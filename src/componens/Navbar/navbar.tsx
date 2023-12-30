"use client";
import styles from "./navbar.module.css";
import { WebDevelopment } from "@/componens/svg";
import { Logo } from "@/componens/svg/Logo";
import { useState } from "react";
import Dropmenu from "../Dropdownmenu/index";
import Link from "next/link";
import { useAuthContext } from "@/app/Context/auth";

export default function Navbar() {
  const [drop, setDrop] = useState(false);
  const Drop = () => {
    setDrop(!drop);
  };

  const { user } = useAuthContext();
  return (
    <nav>
      <div className={styles.navbar}>
        <Link href="/Dashboard" className={styles.logo}>
          <Logo></Logo>
        </Link>
        <div className={styles.user}>
          <button className={styles.Icon}>
            {user ? user.fname.charAt(0) + user.lname.charAt(0) : "..."}
          </button>
          <p className={styles.client}>
            {user ? user.fname + " " + user.lname : "Loading..."}
          </p>
          <p className={styles.scroll} onClick={Drop}>
            <WebDevelopment></WebDevelopment>
          </p>
        </div>
      </div>
      {drop ? <Dropmenu></Dropmenu> : null}
    </nav>
  );
}
