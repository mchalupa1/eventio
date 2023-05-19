"use client";
import style from "./index.module.css";
import { use, useState } from "react";

const Dropmenu = () => {
return(
    <div className={style.container}>
    <div className={style.all}>
       <ul className={style.ull}>
        <li>Profile</li>
        <li>Log out</li>
       </ul> 
    </div>
    </div>
)
}

export default Dropmenu;