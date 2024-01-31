'use client';
import { useEffect, useState } from 'react';
import { Event } from '@/services/firebase/useDataHook';
import DateTime from '@/app/Dashboard/even/component/DateTime';
import Description from '@/app/Dashboard/even/component/Description';
import LowerPart from '@/app/Dashboard/even/component/LowerPart';
import Mentor from '@/app/Dashboard/even/component/Mentor';
import Title from '@/app/Dashboard/even/component/Title';
import CreateBtn from '@/componens/CreateBtn';
import Loading from '@/componens/Loading/loading';
import Navbar from '@/componens/Navbar/navbar';
import AttendeesList from './components/Attendees';
import style from './page.module.css';
import useEvents from '@/services/firebase/useDataHook';

type DetailsProps = {
    params: {
        id: string;
    };
};

const EventDetail: React.FC<DetailsProps> = ({ params }) => {
    const {OriginalData} = useEvents();
	const [data, setData] = useState<Event | undefined>();

	useEffect(() => {
        const eventData = OriginalData?.find((event) => event.id === params.id);
        setData(eventData);
    }, [OriginalData]);


    return (
        <main>
            <Navbar />
            <div className={style.middlePart}>
                <p className={style.idecko}>Detail event: {params.id}</p>
                {data ? (
                    <div className={style.allBox}>
                        <div className={style.box}>
                            <DateTime grip={true} date={data.date} time={data.time} />
                            <Title grip={true} title={data.title} />
                            <Mentor grip={true} author={data.author} />
                            <Description description={data.description} grip={true} />
                            <LowerPart
                                grip={true}
                                joiners={data.joiners}
                                capacity={data.capacity}
                                author={data.author}
                                idecko={data.id}
                            />
                        </div>
                        <AttendeesList joiners={data.joiners} author={data.author} />
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
            <CreateBtn></CreateBtn>
        </main>
    );
};

export default EventDetail;
