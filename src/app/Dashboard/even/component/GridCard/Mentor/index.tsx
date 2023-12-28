"use client";
import { db } from "@/services/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "./style.module.css"
type User = {
    fname: string;
    lname: string;
  };
  
  export default function Mentor(props: { authorUID: string,grip:boolean }) {
    const [data, setData] = useState<User | undefined>(undefined); 
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", props.authorUID);
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
      <p className={props.grip? style.mentor:style.mentor2}>{data?.fname} {data?.lname}</p>
    </>
  );
}
