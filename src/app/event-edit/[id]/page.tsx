'use client';

import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Event } from '@/app/Dashboard';
import AttendeesList from '@/app/event-detail/[id]/components/Attendees';
import Loading from '@/componens/Loading/loading';
import Navbar from '@/componens/Navbar/navbar';
import { db } from '@/services/firebase/db';

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
                        <div className={style.box}></div>
                        <AttendeesList joiners={data.joiners} authorUID={data.authorUID} />
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </main>
    );
};

export default EventDetail;
