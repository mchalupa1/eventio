import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../db';
import { Event } from './models/Event';
import { snapshotToArray } from './utils/snapshotToArray';

const colRef = collection(db, 'events');

export const useEvents = () => {
    const [data, setData] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            colRef,
            (snapshot) => {
                setLoading(true);
                const events = snapshotToArray<{ id: string; title: string; joiners: string }>(
                    snapshot,
                ).map((data) => new Event(data));

                setLoading(false);
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

    return { data, loading };
};
