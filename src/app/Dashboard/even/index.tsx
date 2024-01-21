'use client';

import { Event } from '@/services/firebase/firestore/models/Event';

import Loading from '../../../componens/Loading/loading';
import { useThemeContext } from '../componens/Context/Filter/index';
import GridCard from './component/GridCard';
import styles from './styles.module.css';

interface EventsListProps {
    data: Event[];
    loading: boolean;
    grid: boolean;
}

export default function EventsList({ data, loading }: EventsListProps) {
    const { grip } = useThemeContext();

    if (loading) return <Loading />;

    return (
        <div className={grip === false ? '' : styles.allBoxs}>
            {data.map(({ id, title, description, dateTime, capacity, joiners, authorUID }) => (
                <GridCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    dateTime={dateTime}
                    capacity={capacity}
                    joiners={joiners}
                    authorUID={authorUID}
                    grip={grip}
                />
            ))}
        </div>
    );
}
