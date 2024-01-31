'use client';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/db';
import style from '../index.module.css';
import { User } from '@/app/Context/auth';

const BtnLeave = (props: { client?: User; joiners: User[]; id: string }) => {


	const ButtonChange = async (e: any) => {
        e.preventDefault();
        if (props.client?.uid && props.joiners.some(joiner => joiner.uid === props.client?.uid)) {
            const docRef = doc(db, 'events', props.id);
            let joiners = [...props.joiners];
            const fillJoiners = joiners.filter((item) => {
                return item.uid !== props.client?.uid;
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
