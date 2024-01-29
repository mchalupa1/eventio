'use client';
import { useState } from 'react';
import Navbar from '@/componens/Navbar/navbar';
import { WebD1 } from '@/componens/svg2/WebD1';
import { WebD2 } from '@/componens/svg2/WebD2';
import { WebDevelopment2 } from '@/componens/svg/index2-darkgrip';
import { WebDevelopment3 } from '@/componens/svg/index3';
import { useAuthContext } from '../Context/auth';
import EventsList from './components/Data';
import Box from './components/box/index';
import style from './page.module.css';

const Profile = () => {
    /*Grip*/
    const [grip, setGrip] = useState(true);

    return (
        <div className={style.all}>
            <Navbar></Navbar>
            <div className={style.middlePart}>
                <div className={style.upperpart}>
                    <Box></Box>
                    <div className={style.mid}>
                        <p className={style.events}>My Events</p>
                        <ul className={style.allGrip}>
                            <li
                                role="button"
                                className={style.grip1}
                                onClick={() => {
                                    setGrip(!grip);
                                }}
                            >
                                {grip === true ? (
                                    <WebDevelopment2></WebDevelopment2>
                                ) : (
                                    <WebD1></WebD1>
                                )}
                            </li>
                            <li
                                role="button"
                                className={style.grip2}
                                onClick={() => {
                                    setGrip(!grip);
                                }}
                            >
                                {grip === false ? (
                                    <WebD2></WebD2>
                                ) : (
                                    <WebDevelopment3></WebDevelopment3>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <EventsList grip={grip}></EventsList>
            </div>
        </div>
    );
};

export default Profile;
