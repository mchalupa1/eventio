"use client";
import styles from "./navbar.module.css";
import { WebDevelopment } from "@/componens/svg";
import { Logo } from "@/componens/svg/Logo";
import { use, useRef, useState } from "react";
import Dropmenu from "../Dropdownmenu/index";

export default function Navbar() {
  const [drop, setDrop] = useState(false);
  const Drop = () => {
    setDrop(!drop);
  };

  return (
    <>
      <div className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <Logo></Logo>
        </a>
        <div className={styles.user}>
          <button className={styles.Icon}>TW</button>
          <a href="/" className={styles.client}>
            Tom Watts
          </a>
          <a className={styles.scroll} onClick={Drop}>
            <WebDevelopment></WebDevelopment>
          </a>
        </div>
      </div>
      {drop? <Dropmenu></Dropmenu>:null}
    </>
  );
}
