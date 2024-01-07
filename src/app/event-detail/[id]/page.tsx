"use client";
import Navbar from "@/componens/Navbar/navbar";
import style from "./page.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/db";
import { Event } from "@/app/Dashboard";
import { useEffect, useState } from "react";
import DateTime from "@/app/Dashboard/even/component/GridCard/DateTime";
import Mentor from "@/app/Dashboard/even/component/GridCard/Mentor";
import Loading from "@/componens/Loading/loading";
import Title from "@/app/Dashboard/even/component/GridCard/Title";
import Description from "@/app/Dashboard/even/component/GridCard/Description";
import LowerPart from "@/app/Dashboard/even/component/GridCard/LowerPart";
import AttendeesList from "./components/Attendees";
import CreateBtn from "@/componens/CreateBtn";

type DetailsProps = {
  params: {
    id: string;
  };
};

const EventDetail: React.FC<DetailsProps> = ({ params }) => {
  const [data, setData] = useState<Event | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "events", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as Event;
          setData((prevData) => {
            if (prevData?.joiners !== userData.joiners) {
              return { ...prevData, ...userData };
            }
            return prevData;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchData();
  }, []);

  return (
    <main>
      <Navbar />
      <div className={style.middlePart}>
        <p className={style.idecko}>Detail event: {params.id}</p>
        {data ? (
          <div className={style.allBox}>
            <div className={style.box}>
              <DateTime grip={true} date={data.date} time={data.time} />
              <Title grip={true} title={data.title} />
              <Mentor grip={true} authorUID={data.authorUID} />
              <Description description={data.description} grip={true} />
              <LowerPart
                grip={true}
                joiners={data.joiners}
                capacity={data.capacity}
                authorUID={data.authorUID}
                idecko={data.id}
              />
            </div>
            <AttendeesList joiners={data.joiners} authorUID={data.authorUID} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <CreateBtn></CreateBtn>
    </main>
  );
};

export default EventDetail;
