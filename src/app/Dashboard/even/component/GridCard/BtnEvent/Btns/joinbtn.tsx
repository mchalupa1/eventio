"use client";
import { db } from "@/services/firebase/db";
import { doc, updateDoc } from "firebase/firestore";
import style from "../style.module.css";

const BtnJoin = (props: {
  uid: string;
  joiners: string;
  id: string;
  capac: string;
}) => {
  const ButtonChange = async () => {
    if (Number(props.capac) === props.joiners.length) {
    } else {
      if (props.joiners.includes(props.uid) === false) {
        const docRef = doc(db, "events", props.id);
        let updatedJoiners = [...props.joiners];
        updatedJoiners = [...updatedJoiners, props.uid];
        if (docRef) {
          await updateDoc(docRef, { joiners: updatedJoiners });
        }
      }
    }
  };

  return (
    <div>
      <button className={style.statusJ} onClick={ButtonChange}>
        JOIN
      </button>
    </div>
  );
};

export default BtnJoin;