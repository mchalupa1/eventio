'use client';
import Link from 'next/link';
import DateTime from './DateTime';
import Description from './Description';
import LowerPartGrip from './LowerPart';
import LowerPartRow from './LowerPartRow';
import Mentor from './Mentor';
import Title from './Title';
import style from './index.module.css';
import Loading from '@/componens/Loading/loading';
import { Event } from '@/services/firebase/useDataHook';

interface EventsListProps {
	data:  Event[] | undefined;
	grip: boolean;
	loading: boolean;
	error: string | null;
  }

export default function EventsList({data, grip, loading, error}:EventsListProps) {

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <p>{error}</p>;
	}


	return (
        <div className={grip === false ? style.allBoxsgrip : style.allBoxs}>
            {data?.map((item) => {
                const { id, date, title, description, capacity, joiners, time, author, startDate } = item;
                return (
                    <Link
                        href={`/event-detail/${item.id}`}
                        style={{ textDecoration: 'none' }}
                        className={grip ? style.GridOneBox : style.RowOneBox}
                        key={id}
                    >
                        <DateTime grip={grip} date={date} time={time}></DateTime>
                        <Title grip={grip} title={title}></Title>
                        <Mentor grip={grip} author={author}></Mentor>
                        <Description grip={grip} description={description}></Description>
                        {grip ? (
                            <LowerPartGrip
                                grip={grip}
                                joiners={joiners}
                                capacity={capacity}
                                author={author}
                                idecko={id}
                            ></LowerPartGrip>
                        ) : (
                            <LowerPartRow
                                grip={grip}
                                joiners={joiners}
                                capacity={capacity}
                                author={author}
                                idecko={id}
                            ></LowerPartRow>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}


