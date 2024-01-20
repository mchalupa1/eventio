'use client';

import Link from 'next/link';

import { Person } from '@/componens/svg/Person';

import BtnEvent from '../BtnEvent';
import style from './index.module.css';

export default function LowerPart(props: {
    grip: boolean;
    joiners: string[];
    capacity: number;
    authorUID: string;
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
                    author={props.authorUID}
                    joiners={props.joiners}
                    idec={props.idecko}
                    capac={props.capacity}
                ></BtnEvent>
            </div>
        </div>
    );
}
