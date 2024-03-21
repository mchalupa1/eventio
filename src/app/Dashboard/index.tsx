'use client';
import Navbar from '@/componens/Navbar/navbar';
import CreateBtn from '../../componens/CreateBtn';
import Header from './componens/Head';
import EventsList from './even/component';
import style from './page.module.css';
import useGrip from './componens/Head/useGrip';
import useEvents from '@/services/firebase/useDataHook';

export default function Page() {
	const { data, loading, error,pick, FilterAllEvents, FilterFutureEvents, FilterPastEvents } = useEvents("events");
	const { grip, toggleGrip } = useGrip();


    return (
        <div className={style.all}>
                <Navbar></Navbar>
                <main className={style.middlePart}>
				<Header
                    grip={grip}
                    toggleGrip={toggleGrip}
                    pick={pick}
                    FilterAllEvents={FilterAllEvents}
                    FilterFutureEvents={FilterFutureEvents}
                    FilterPastEvents={FilterPastEvents}
				/>
                <EventsList data={data} loading={loading} error={error} grip={grip}></EventsList>
                </main>
                <CreateBtn></CreateBtn>
        </div>
    );
}
