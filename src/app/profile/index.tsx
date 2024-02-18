'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/componens/Navbar/navbar';
import { WebD1 } from '@/componens/svg2/WebD1';
import { WebD2 } from '@/componens/svg2/WebD2';
import { WebDevelopment2 } from '@/componens/svg/index2-darkgrip';
import { WebDevelopment3 } from '@/componens/svg/index3';
import useEvents, { Event } from '@/services/firebase/useDataHook';
import { useAuthContext } from '../Context/auth';
import useGrip from '../Dashboard/componens/Head/useGrip';
import EventsList from '../Dashboard/even/component';
import Box from './components/box/index';
import style from './page.module.css';

const Profile = () => {
    const { grip, toggleGrip } = useGrip();
    const { user } = useAuthContext();
    const [data, setData] = useState<Event[] | undefined>();
    const { OriginalData, loading, error } = useEvents('events');

    useEffect(() => {
        const filterData: Event[] | undefined = OriginalData?.filter((item) => {
            if (item.author.uid === user?.uid) {
                return item;
            } else if (item.joiners.some((joiner) => joiner.uid === user?.uid)) {
                return item;
            }
        });
        setData(filterData);
    }, [user, OriginalData]);

    return (
        <div className={style.all}>
            <Navbar></Navbar>
            <div className={style.middlePart}>
                <div className={style.upperpart}>
                    <Box></Box>
                    <div className={style.mid}>
                        <p className={style.events}>My Events</p>
                        <ul className={style.allGrip}>
                            <li role="button" className={style.grip1} onClick={toggleGrip}>
                                {grip === true ? (
                                    <WebDevelopment2></WebDevelopment2>
                                ) : (
                                    <WebD1></WebD1>
                                )}
                            </li>
                            <li role="button" className={style.grip2} onClick={toggleGrip}>
                                {grip === false ? (
                                    <WebD2></WebD2>
                                ) : (
                                    <WebDevelopment3></WebDevelopment3>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <EventsList data={data} loading={loading} error={error} grip={grip}></EventsList>
            </div>
        </div>
    );
};

export default Profile;
