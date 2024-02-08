import { format } from 'date-fns';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { User } from '@/app/Context/auth';

import { db } from './db';

export type Event = {
    title: string;
    date: string;
    id: string;
    description: string;
    capacity: number;
    joiners: User[];
    time: string;
    author: User;
};

const useEvents = (collectionName: string) => {
    const [data, setData] = useState<Event[] | undefined>();
    const [OriginalData, setOriginalData] = useState<Event[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pick, setPick] = useState({
        all: true,
        future: false,
        past: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const now = new Date();

            try {
                const queryFutureEvents = query(
                    collection(db, collectionName),
                    where('timestamp', '>=', now),
                );
                const queryPastEvents = query(
                    collection(db, collectionName),
                    where('timestamp', '<=', now),
                );
                const queryAllEvents = query(collection(db, collectionName));

                const unsubscribe = onSnapshot(
                    pick.all ? queryAllEvents : pick.past ? queryPastEvents : queryFutureEvents,
                    (snapshot) => {
                        const newData: Event[] = [];
                        snapshot.forEach((doc) => {
                            newData.push(doc.data() as Event);
                        });

                        setData(newData);
                        setOriginalData(newData);
                        setLoading(false);
                    },
                );
                return unsubscribe;
            } catch (error) {
                setError('An error occurred while loading data.');
                setLoading(false);
            }
        };

        void fetchData();
    }, [pick, collectionName]);

    const FilterFutureEvents = () => {
        setPick({ all: false, past: false, future: true });
    };

    const FilterPastEvents = () => {
        setPick({ all: false, past: true, future: false });
    };

    const FilterAllEvents = () => {
        setPick({ all: true, future: false, past: false });
    };

    return {
        data,
        OriginalData,
        loading,
        error,
        pick,
        FilterFutureEvents,
        FilterPastEvents,
        FilterAllEvents,
    };
};

export default useEvents;
