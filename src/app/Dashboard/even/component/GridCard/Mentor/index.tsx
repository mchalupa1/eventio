'use client';
import style from './style.module.css';
import { User } from '@/app/Context/auth';

export default function Mentor(props: { author: User; grip: boolean }) {

    return (
        <>
            <p className={props.grip ? style.mentor : style.mentor2}>
                {props.author.fname} {props.author.lname}
            </p>
        </>
    );
}
