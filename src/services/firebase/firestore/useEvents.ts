import { QueryDocumentSnapshot, QuerySnapshot, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../db';
import { useEffect, useState } from 'react';
import { Event } from './models/Event';
import { snapshotToArray } from './utils/snapshotToArray';

const colRef = collection(db, 'events');

export const useEvents = () => {
    const [data, setData] = useState<Event[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            colRef,
            (snapshot) => {
                const events = snapshotToArray<{ id: string; title: string, joiners: string }>(snapshot).map(
                    (bar) => new Event(bar),
                );

                setData(events);
            },
            (error) => {
                console.error(error);
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return { data };
};
