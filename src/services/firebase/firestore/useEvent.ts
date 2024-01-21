import { doc, getDocFromCache } from 'firebase/firestore';
import { db } from '../db';
import { Event } from './models/Event';
import { useData } from './useData';

export const useEvent = (id: string) => {
    const document = doc(db, 'events', id);

    const { data, isLoading, refetch } = useData({ fetcher: () => getDocFromCache(document) });

    return { data, refetch };
};
