"use client";
import { useThemeContext } from "../componens/Context/Filter/index";
import GridCard from "./component/GridCard";


export default function EventsList() {
  /*Data providing*/
  const {grip,data} = useThemeContext();

  return (
    <>
    <GridCard data={data} grip={grip}></GridCard>
    </>   
  );
}
