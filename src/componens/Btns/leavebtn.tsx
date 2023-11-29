"use client";
import { db } from "@/services/firebase/db";
import { doc, updateDoc } from "firebase/firestore";

const BtnLeave = (props: { uid: string; joiners: string; id: string }) => {


  const ButtonChange = async () => {
    if (props.joiners.includes(props.uid)) {
      const docRef = doc(db, "events", props.id);
      let updatedJoiners = [...props.joiners];
      updatedJoiners = [...updatedJoiners, props.uid];
      if (docRef) {
        await updateDoc(docRef, { joiners: updatedJoiners });
      }
    }
  };



  return (
    <div>
      <button onClick={ButtonChange}>LEAVE</button>
    </div>
  );
};

export default BtnLeave;
