'use client';
import { Person } from '@/componens/svg/Person';
import BtnEvent from '../BtnEvent';
import style from './index.module.css';
import { User } from '@/app/Context/auth';

export default function LowerPart(props: {
    grip: boolean;
    joiners: User[];
    capacity: number;
    author: User;
    idecko: string;
}) {
    return (
        <div className={style.lower}>
            <div className={style.PesronCapacity}>
                {' '}
                <Person></Person>
                <p className={style.capacity}>
                    {props.joiners.length} of {props.capacity}
                </p>
            </div>
            <div>
                <BtnEvent
                    author={props.author}
                    joiners={props.joiners}
                    idec={props.idecko}
                    capac={props.capacity}
                ></BtnEvent>
            </div>
        </div>
    );
}
