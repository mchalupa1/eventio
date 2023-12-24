"use client";
import style from "./index.module.css";
import DateTime from "./DateTime";
import Description from "./Description";
import LowerPart from "./LowerPart";
import Mentor from "./Mentor";
import Title from "./Title";
import { Event } from "@/app/Dashboard/page";
export default function GridCard(props: { data: Event[]; grip: boolean }) {
  return (
    <div className={props.grip === false ? style.allBoxsgrip:style.allBoxs}>
      {props.data.map((item) => {
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
          <div
            className={props.grip ? style.GridOneBox : style.RowOneBox}
            key={id}
          >
            <DateTime grip={props.grip} date={date} time={time}></DateTime>
            <Title grip={props.grip} title={title}></Title>
            <Mentor grip={props.grip} uid={authorUID}></Mentor>
            <Description
              grip={props.grip}
              description={description}
            ></Description>
            <LowerPart
              grip={props.grip}
              joiners={joiners}
              capacity={capacity}
              authorUID={authorUID}
              idecko={id}
            ></LowerPart>
          </div>
        );
      })}
    </div>
  );
}
