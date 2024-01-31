'use client';

import { useRouter } from 'next/navigation';

import { User, useAuthContext } from '@/app/Context/auth';

import BtnJoin from './Btns/joinbtn';
import BtnLeave from './Btns/leavebtn';
import style from './index.module.css';

export default function BtnEvent(props: {
    author?: User;
    joiners: User[]; //joiners
    idec: string;
    capac: number; //capacity
}) {
    const { user } = useAuthContext();
    const { push } = useRouter();

    const Routing = (e: any) => {
        e.preventDefault();
        push('/event-edit/' + props.idec);
    };

    return (
        <>
            {props.joiners.length === props.capac ? (
                user && user.uid === props.author?.uid ? (
                    <button className={style.statusE} onClick={Routing}>
                        EDIT
                    </button>
                ) : user && props.joiners.some((joiner) => joiner.uid === user.uid) ? (
                    <BtnLeave client={user} joiners={props.joiners} id={props.idec} />
                ) : (
                    <button
                        className={style.filledBtn}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        FILLED
                    </button>
                )
            ) : user && user.uid === props.author?.uid ? (
                <button className={style.statusE} onClick={Routing}>
                    EDIT
                </button>
            ) : user && props.joiners.some((joiner) => joiner.uid === user.uid) ? (
                <BtnLeave client={user} joiners={props.joiners} id={props.idec} />
            ) : (
                <BtnJoin
                    client={user}
                    joiners={props.joiners}
                    id={props.idec}
                    capac={props.capac}
                />
            )}
        </>
    );
}
