"use client";
import Loading from "@/app/Dashboard/Loading/loading";
import GridCard from "@/app/Dashboard/even/component/GridCard";
import { Event } from "@/app/Dashboard/page";
import { auth } from "@/services/firebase/auth";
import { db } from "@/services/firebase/db";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type User = { uid: string };

const useAuthorization = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
        console.log(userData);
      } else {
        setUser(undefined);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};

export default function EventsList(props: { grip: boolean }) {
  const user = useAuthorization(); 
  const [data, setData] = useState<Event[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "events");
      onSnapshot(colRef, (snapshot) => {
        const newData: Event[] = [];
        
        snapshot.forEach((doc) => {
          newData.push(doc.data() as Event);
        });
        
        const filterData: Event[] = newData.filter((item) => {
          if (item.authorUID === user?.uid) {
            return item;
          } else if (item.joiners.includes(user?.uid as string)) {
            return item;
          } 
        });

        console.log(filterData);
        setData(filterData);
      });
    };
    
    void fetchData();
  }, [user]); 

  console.log(data);

  return (
    <>
      {data ? (
        <GridCard data={data} grip={props.grip}></GridCard>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
