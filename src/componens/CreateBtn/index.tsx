'use client';
import Link from 'next/link';
import style from './index.module.css';

export default function CreateBtn() {
    return (
        <aside className={style.create}>
            <Link href="/create-event" className={style.plus}>
                +
            </Link>
        </aside>
    );
}
