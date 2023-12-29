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

  const getJoiners = async () => {
    if (Array.isArray(props.joiners)) {
      const joinersPromises = props.joiners.map(async (item) => {
        if (user && item === user.uid) {
          setUsers((prevUsers) => [...prevUsers, { fname: "You", lname: "" }]);
        } else {
          const docRef = doc(db, "users", item);
          const docSnap = await getDoc(docRef);
          const userData: User = docSnap.data() as User;
          setUsers((prevUsers) => [...prevUsers, userData]);
        }
      });

      await Promise.all(joinersPromises);
    }
  };

  useEffect(() => {
    getJoiners();
  }, []);

  return (
    <div className={style.BoxJoiners}>
      <p>Attendees</p>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {`${user.fname} ${user.lname}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
