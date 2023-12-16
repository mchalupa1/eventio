"use client";
import Allboxgrip from "../AllBoxGrip/AllboxGrip";
import Navbar from "@/componens/Navbar/navbar";
import EventsList from "./even";
import style from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebDevelopment3 } from "@/componens/svg/index3";
import Droplist from "@/componens/Droplist";
import CreateBtn from "./componens/CreateBtn";

export default function Page() {
  

  /*list grip changig color*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };

  return (
    <main className={style.all}>
      <Navbar></Navbar>
      <div className={style.middlePart}>
        <div className={style.categories}>
          <ul className={style.allEV}>
            <li className={style.alE}>
              ALL EVENTS
            </li>
          </ul>
          <ul className={style.allGrip}>
            <li role="button" className={style.grip1} onClick={changeGripColor}>
              {grip ? <WebDevelopment2></WebDevelopment2> : <WebD1></WebD1>}
            </li>
            <li role="button" className={style.grip2} onClick={changeGripColor}>
              {grip === false ? (
                <WebD2></WebD2>
              ) : (
                <WebDevelopment3></WebDevelopment3>
              )}
            </li>
          </ul>
        </div>
        {grip ? <EventsList grip={grip}></EventsList> : <Allboxgrip></Allboxgrip>}
      </div>
      <CreateBtn></CreateBtn>
    </main>
  );
}
