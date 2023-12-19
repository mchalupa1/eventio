"use client";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import style from "./index.module.css";
import { useContext, useState } from "react";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebDevelopment3 } from "@/componens/svg/index3";
import Droplist from "@/componens/Droplist";
import { useThemeContext } from "../../page";
import { isAfter, parse } from "date-fns";
export default function Head() {
  /*obdrzeni contextu*/
  const { data, setData } = useThemeContext();
  /*Filter Future*/
  const FilterFutureEvents = () => {
    // Aktuální datum a čas
    const currentDate = new Date();

    // Filtrování budoucích událostí
    const futureEvents = data.filter((item) => {
      // Převedení data a času události na objekt Date
      const eventDateTime = parse(
        `${item.date} ${item.time}`,
        "LLLL d, y HH:mm",
        new Date()
      );

      // Porovnání s aktuálním datem a časem
      return isAfter(eventDateTime, currentDate);
    });

    return futureEvents;
  };
  const futureEvents = FilterFutureEvents();
  setData(futureEvents);

  /*changing čtverecky/grip*/
  const [grip, setgrip] = useState(true);
  const changeGripColor = () => {
    setgrip(!grip);
  };
  /*pouští dropmenu kdyz je mala size*/
  const [droplist, setdroplist] = useState(true);

  return (
    <>
      <main className={style.categories}>
        <ul className={style.allEV}>
          <li className={style.categorisShow}>SHOW:</li>
          <li className={style.alE}>
            ALL EVENTS
            <a className={style.show} onClick={() => setdroplist(!droplist)}>
              <WebD3WebD3></WebD3WebD3>
            </a>
          </li>
          <li className={style.fE} onClick={FilterFutureEvents}>
            FUTURE EVENTS
          </li>
          <li className={style.pE}>PAST EVENTS</li>
        </ul>
        <ul className={style.allGrip}>
          <li role="button" className={style.grip1} onClick={changeGripColor}>
            {grip === true ? (
              <WebDevelopment2></WebDevelopment2>
            ) : (
              <WebD1></WebD1>
            )}
          </li>
          <li role="button" className={style.grip2} onClick={changeGripColor}>
            {grip === false ? (
              <WebD2></WebD2>
            ) : (
              <WebDevelopment3></WebDevelopment3>
            )}
          </li>
        </ul>
      </main>
      {droplist === false ? <Droplist></Droplist> : droplist}
    </>
  );
}
