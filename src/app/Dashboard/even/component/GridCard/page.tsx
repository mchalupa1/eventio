"use client";
import style from "./page.module.css";
import DateTime from "./DateTime";
import Description from "./Description";
import LowerPart from "./LowerPart";
import Mentor from "./Mentor";
import Title from "./Title";
import { useThemeContext } from "@/app/Dashboard/componens/Context/Filter";

export default function GridCard() {
  const { data } = useThemeContext();
  
  return (
    <>
      {data.map((item) => {
        const {
          id,
          date,
          title,
          description,
          capacity,
          joiners,
          time,
          authorUID,
        } = item;
        return (
          <div className={style.onebox} key={id}>
            <DateTime date={date} time={time}></DateTime>
            <Title title={title}></Title>
            <Mentor uid={authorUID}></Mentor>
            <Description description={description}></Description>
            <LowerPart
              joiners={joiners}
              capacity={capacity}
              authorUID={authorUID}
              idecko={id}
            ></LowerPart>
          </div>
        );
      })}
    </>
  );
}
