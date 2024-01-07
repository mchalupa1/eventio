'use client';

import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/app/Context/auth';
import { Event } from '@/app/Dashboard';
import GridCard from '@/app/Dashboard/even/component/GridCard';
import Loading from '@/componens/Loading/loading';
import { db } from '@/services/firebase/db';

export default function EventsList(props: { grip: boolean }) {
    const { user } = useAuthContext();
    const [data, setData] = useState<Event[] | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, 'events');
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

                setData(filterData);
            });
        };

        void fetchData();
    }, [user]);

    return <>{data ? <GridCard data={data} grip={props.grip}></GridCard> : <Loading></Loading>}</>;
}