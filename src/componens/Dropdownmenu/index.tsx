"use client";
import style from "./index.module.css";
import { use, useState } from "react";
import Link from "next/link";
const Dropmenu = () => {
return(
    <div className={style.container}>
    <div className={style.all}>
       <ul className={style.ull}>
        <li><Link href={"Profile"} style={{textDecoration: 'none', color:"#9CA5AF"}}>Profile</Link></li>
        <li>Log out</li>
       </ul> 
    </div>
    </div>
)
}

export default Dropmenu;