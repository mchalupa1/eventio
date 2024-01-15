'use client';

import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Navbar from '@/componens/Navbar/navbar';
import { db } from '@/services/firebase/db';

import CreateBtn from '../../componens/CreateBtn';
import { ThemeContext } from './componens/Context/Filter';
import Head from './componens/Head';
import EventsList from './even';
import style from './page.module.css';

export type Event = {
    title: string;
    date: string;
    id: string;
    description: string;
    capacity: string;
    joiners: string;
    time: string;
    authorUID: string;
};

export default function Page() {
    /*Data fetching*/
    const [data, setData] = useState<Event[] | undefined>();
    const [OriginalData, setoRData] = useState<Event[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, 'events');

            onSnapshot(colRef, (snapshot) => {
                const newData: Event[] = [];

                snapshot.forEach((doc) => {
                    newData.push(doc.data() as Event);
                });

                setData(newData);
                setoRData(newData);
            });
        };

        void fetchData();
    }, []);

    /*list grip changig color*/
    const [grip, setgrip] = useState(true);

    return (
        <main className={style.all}>
            <ThemeContext.Provider
                value={{ data, setData, OriginalData, setoRData, grip, setgrip }}
            >
            <Navbar></Navbar>
                <div className={style.middlePart}>
                    <Head></Head>
                    <EventsList></EventsList>
                </div>
                <CreateBtn></CreateBtn>
            </ThemeContext.Provider>
        </main>
    );
}
