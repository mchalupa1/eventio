"use client";
import { Suspense, use, useState } from "react";
import { useThemeContext } from "../componens/Context/Filter/index";
import Loading from "../Loading/loading";
import GridCard from "./component/GridCard";

export default function EventsList() {
  /*Data providing*/
  const { grip, data } = useThemeContext();
console.log(data)
  return (
    <>
      {data.length > 0? (
        <GridCard data={data} grip={grip}></GridCard>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
