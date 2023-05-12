"use client";

import { use, useState } from "react";
import style from "./BtnBox"
import allstatus from "./DataforBox";

const BtnBox = () => {
  const [ste, setste] = useState(allstatus);
  const change = () => {
    
  };
  return (
    <>
    <div>
      {allstatus.map((onestatus) => {
        const { status, id } = onestatus;
        return (
          <>
            <button
              onClick={() => change()}
              key={id}
              className={
                status === "JOIN"
                  ? style.statusJJ
                  : status === "LEAVE"
                  ? style.statsuLL
                  : style.statusEE
              }
            >
              {status}
            </button>
          </>
        );
      })}
      </div>
    </>
  );
};

export default BtnBox;
