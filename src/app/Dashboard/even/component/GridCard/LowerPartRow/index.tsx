'use client';
import { User } from '@/app/Context/auth';
import BtnEvent from '../BtnEvent/index';
import style from './index.module.css';

export default function LowerPart(props: {
    grip: boolean;
    joiners: User[];
    capacity: number;
    author: User;
    idecko: string;
}) {
    return (
        <>
            <p className={style.capacity}>
                {props.joiners.length} of {props.capacity}
            </p>
            <div className={style.boxbtn}>
                <BtnEvent
                    author={props.author}
                    joiners={props.joiners}
                    idec={props.idecko}
                    capac={props.capacity}
                ></BtnEvent>
            </div>
        </>
    );
}
