"use client";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import { useAuthContext } from "@/app/Context/auth";

type User = { fname: string; lname: string };

export default function AttendeesList(props: {
  joiners: string[] | string;
  authorUID: string;
}) {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      
      let usersData: User[] = [];

      if (Array.isArray(props.joiners)) {
        await Promise.all(
          props.joiners.map(async (item) => {
            if (user && item === user.uid) {
              usersData.push({ fname: "You", lname: "" });
            } else {
              const docRef = doc(db, "users", item);
              const docSnap = await getDoc(docRef);
              const userData: User = docSnap.data() as User;
              usersData.push(userData);
            }
          })
        );

        setUsers(usersData);
      }
    };

    fetchData();
  }, [props.joiners, user]);




  return (
    <div className={style.BoxJoiners}>
      <p className={style.attendees}>Attendees</p>
      <div className={style.allJoiners}>
      {users.map((user, index) => (
          <div key={index} className={user.fname === "You"? style.YouBox:style.joinerBox}>
            <p className={user.fname ==="You"? style.You: style.joiner}>{`${user.fname} ${user.lname}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
