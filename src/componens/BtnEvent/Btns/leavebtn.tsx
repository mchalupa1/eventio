'use client';

import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/services/firebase/db';

import style from '../style.module.css';

const BtnLeave = (props: { uid: string; joiners: string; id: string }) => {
    const ButtonChange = async () => {
        if (props.joiners.includes(props.uid)) {
            const docRef = doc(db, 'events', props.id);
            let joiners = [...props.joiners];
            const fillJoiners = joiners.filter((item) => {
                return item !== props.uid;
            });

            if (docRef) {
                await updateDoc(docRef, { joiners: fillJoiners });
            }
        }
    };

    return (
        <div>
            <button className={style.statsuL} onClick={ButtonChange}>
                LEAVE
            </button>
        </div>
    );
};

export default BtnLeave;
