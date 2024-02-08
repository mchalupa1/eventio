'use client';
import Navbar from '@/componens/Navbar/navbar';
import CreateBtn from '../../componens/CreateBtn';
import Header from './componens/Head';
import EventsList from './even/component';
import style from './page.module.css';
import useGrip from './componens/Head/useGrip';
import useEvents from '@/services/firebase/useDataHook';
import { isAfter } from 'date-fns';

export default function Page() {
	const { data, loading, error,pick, FilterAllEvents, FilterFutureEvents, FilterPastEvents } = useEvents("events");
	const { grip, toggleGrip } = useGrip();


    return (
        <main className={style.all}>
                <Navbar></Navbar>
                <div className={style.middlePart}>
				<Header
          grip={grip}
          toggleGrip={toggleGrip}
          pick={pick}
          FilterAllEvents={FilterAllEvents}
          FilterFutureEvents={FilterFutureEvents}
          FilterPastEvents={FilterPastEvents}
        />
                    <EventsList data={data} loading={loading} error={error} grip={grip} ></EventsList>
                </div>
                <CreateBtn></CreateBtn>
        </main>
    );
}
const example = isAfter(new Date(2024, 3, 2), new Date(2020, 2, 3))
//=> true