import { db } from "@/services/firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

type Event = {
  title: string;
  date: string;
  id: string;
  description: string;
  capacity: string;
  joiners: string;
  time: string;
  authorUID: string;
};

export function Data2({}) {
  /* Data fetching */
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "events");

      onSnapshot(colRef, (snapshot) => {
        const newData: Event[] = [];

        snapshot.forEach((doc) => {
          newData.push(doc.data() as Event);
        });
        setData(newData);
      });
    };

    void fetchData(); 

    
    return () => {
      
    };
  }, []); 

  return data;
}