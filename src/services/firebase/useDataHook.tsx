import { type Unsubscribe, collection, onSnapshot, query, where } from 'firebase/firestore';
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
    startDate: Date;
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
        const now = new Date();
        let unsubscribe: Unsubscribe;

        setLoading(true);
        setError(null);

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

            unsubscribe = onSnapshot(
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
        } catch (error) {
            setError('An error occurred while loading data.');
            setLoading(false);
        }

        return () => {
            unsubscribe();
        };
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
