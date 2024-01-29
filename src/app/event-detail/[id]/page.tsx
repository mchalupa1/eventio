'use client';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Event } from '@/app/Dashboard';
import DateTime from '@/app/Dashboard/even/component/GridCard/DateTime';
import Description from '@/app/Dashboard/even/component/GridCard/Description';
import LowerPart from '@/app/Dashboard/even/component/GridCard/LowerPart';
import Mentor from '@/app/Dashboard/even/component/GridCard/Mentor';
import Title from '@/app/Dashboard/even/component/GridCard/Title';
import CreateBtn from '@/componens/CreateBtn';
import Loading from '@/componens/Loading/loading';
import Navbar from '@/componens/Navbar/navbar';
import { db } from '@/services/firebase/db';
import AttendeesList from './components/Attendees';
import style from './page.module.css';

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
                const docRef = doc(db, 'events', params.id);
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
                            <Mentor grip={true} author={data.author} />
                            <Description description={data.description} grip={true} />
                            <LowerPart
                                grip={true}
                                joiners={data.joiners}
                                capacity={data.capacity}
                                author={data.author}
                                idecko={data.id}
                            />
                        </div>
                        <AttendeesList joiners={data.joiners} author={data.author} />
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
