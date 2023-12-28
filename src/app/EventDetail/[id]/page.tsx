"use client";
import Navbar from "@/componens/Navbar/navbar";
import style from "./page.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import { Event } from "@/app/Dashboard/page";
import { useEffect, useState } from "react";
import DateTime from "@/app/Dashboard/even/component/GridCard/DateTime";
import Mentor from "@/app/Dashboard/even/component/GridCard/Mentor";
import Loading from "@/app/Dashboard/Loading/loading";
import Title from "@/app/Dashboard/even/component/GridCard/Title";
import Description from "@/app/Dashboard/even/component/GridCard/Description";
import LowerPart from "@/app/Dashboard/even/component/GridCard/LowerPart";

type DetailsProps = {
  params: {
    id: string;
  };
};

const EventDetail: React.FC<DetailsProps> = ({ params }) => {
  const [data, setData] = useState<Event | undefined>(undefined);
  const fetchData = async () => {
    try {
      const docRef = doc(db, "events", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as Event;
        setData(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <>
      <main>
        <Navbar></Navbar>
        <div className={style.middlePart}>
            {
                data? 
                <div>
                    <DateTime grip={true} date={data.date} time={data.time}/>
                    <Mentor grip={true} authorUID={data.authorUID}/>
                    <Title grip={true} title={data.title}/>
                    <Description description={data.description} grip={true}/>
                    <LowerPart grip={true} joiners={data.joiners} capacity={data.capacity} authorUID={data.authorUID} idecko={data.id} ></LowerPart>
                
                </div>
                : <Loading></Loading>
            }
        </div>
      </main>
    </>
  );
};

export default EventDetail;
