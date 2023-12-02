"use client";
import { db } from "@/services/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "./style.module.css"
type User = {
    fname: string;
    lname: string;
  };
  
  export default function Mentor(props: { uid: string }) {
    const [data, setData] = useState<User | null>(null); 
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", props.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setData(userData);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      void fetchData();
    }, []); 
  
    

  return (
    <>
      <p className={style.mentor}>{data?.fname} {data?.lname}</p>
    </>
  );
}
