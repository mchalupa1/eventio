"use client";
import style from "./index.module.css";
import DateTime from "./DateTime";
import Description from "./Description";
import LowerPartGrip from "./LowerPart";
import Mentor from "./Mentor";
import Title from "./Title";
import { Event } from "@/app/Dashboard/page";
import LowerPartRow from "./LowerPart/LowerPartRow";
import Link from "next/link";
export default function GridCard(props: { data: Event[]; grip: boolean }) {
  return (
    <article
      className={props.grip === false ? style.allBoxsgrip : style.allBoxs}
    >
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
          <>
            <Link
              href={`/EventDetail/${item.id}`}
              style={{ textDecoration: "none" }}
              className={props.grip ? style.GridOneBox : style.RowOneBox}
              key={id}
            >
              <DateTime grip={props.grip} date={date} time={time}></DateTime>
              <Title grip={props.grip} title={title}></Title>
              <Mentor grip={props.grip} authorUID={authorUID}></Mentor>
              <Description
                grip={props.grip}
                description={description}
              ></Description>
              {props.grip ? (
                <LowerPartGrip
                  grip={props.grip}
                  joiners={joiners}
                  capacity={capacity}
                  authorUID={authorUID}
                  idecko={id}
                ></LowerPartGrip>
              ) : (
                <LowerPartRow
                  grip={props.grip}
                  joiners={joiners}
                  capacity={capacity}
                  authorUID={authorUID}
                  idecko={id}
                ></LowerPartRow>
              )}
            </Link>
          </>
        );
      })}
    </article>
  );
}
