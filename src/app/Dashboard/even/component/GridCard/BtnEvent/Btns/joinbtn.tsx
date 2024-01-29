'use client';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/db';
import { User } from '@/app/Context/auth';
import style from '../index.module.css';

const BtnJoin = (props: { client?: User; joiners: User[]; id: string; capac: number }) => {
    const ButtonChange = async (e: any) => {
        e.preventDefault();

        if (!props.client) {
            return;
        }

        if (props.capac > props.joiners.length && !props.joiners.includes(props.client)) {
            const docRef = doc(db, 'events', props.id);
            const updatedJoiners = [...props.joiners, props.client];

            if (docRef) {
                await updateDoc(docRef, { joiners: updatedJoiners });
            }
        }
    };

    return (
        <div>
            <button className={style.statusJ} onClick={ButtonChange}>
                JOIN
            </button>
        </div>
    );
};

export default BtnJoin;
