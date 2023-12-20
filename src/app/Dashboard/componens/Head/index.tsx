"use client";
import { WebD3WebD3 } from "@/componens/svg2/WebD3";
import style from "./index.module.css";
import { useState } from "react";
import { WebDevelopment2 } from "@/componens/svg/index2-darkgrip";
import { WebD1 } from "@/componens/svg2/WebD1";
import { WebD2 } from "@/componens/svg2/WebD2";
import { WebDevelopment3 } from "@/componens/svg/index3";
import Droplist from "@/componens/Droplist";
import { useThemeContext } from "../Context/Filter/index";
import { format } from "date-fns";

export default function Head() {
  // Aktuální datum a cas
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");
  /*obdrzeni contextu*/
  const { data, setData, OriginalData, setoRData, grip, setgrip } =
    useThemeContext();

  /*Filter Future*/
  const FilterFutureEvents = () => {
    const futureEvents = OriginalData.filter((item) => {
      if (item.date > currentDate) {
        return true;
      } else if (item.date === currentDate) {
        if (item.time > currentTime) {
          return true;
        }
      } else {
        return false;
      }
    });
    return futureEvents;
  };

  const handleFilterFutureEvents = () => {
    const futureEvents = FilterFutureEvents();
    setData(futureEvents);
  };

  /*Past filter*/
  const FilterPastEvents = () => {
    const pastEvents = OriginalData.filter((item) => {
      if (item.date < currentDate) {
        return true;
      } else if (item.date === currentDate) {
        if (item.time < currentTime) {
          return true;
        }
      } else {
        return false;
      }
    });
    return pastEvents;
  };

  const handleFilterPastEvents = () => {
    const pastEvents = FilterPastEvents();
    setData(pastEvents);
  };

  /*AllEvents Filter*/
  const handleAllEvents = () => {
    setData(OriginalData);
  };

  /*pouští dropmenu kdyz je mala size*/
  const [droplist, setdroplist] = useState(true);

  return (
    <>
      <main className={style.categories}>
        <ul className={style.allEV}>
          <li className={style.categorisShow}>SHOW:</li>
          <li className={style.alE} onClick={handleAllEvents}>
            ALL EVENTS
            <a className={style.show} onClick={() => setdroplist(!droplist)}>
              <WebD3WebD3></WebD3WebD3>
            </a>
          </li>
          <li className={style.fE} onClick={handleFilterFutureEvents}>
            FUTURE EVENTS
          </li>
          <li className={style.pE} onClick={handleFilterPastEvents}>
            PAST EVENTS
          </li>
        </ul>
        <ul className={style.allGrip}>
          <li
            role="button"
            className={style.grip1}
            onClick={() => {
              setgrip(!grip);
            }}
          >
            {grip === true ? (
              <WebDevelopment2></WebDevelopment2>
            ) : (
              <WebD1></WebD1>
            )}
          </li>
          <li
            role="button"
            className={style.grip2}
            onClick={() => {
              setgrip(!grip);
            }}
          >
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
