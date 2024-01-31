'use client';
import Navbar from '@/componens/Navbar/navbar';
import CreateBtn from '../../componens/CreateBtn';
import Head from './componens/Head';
import EventsList from './even/component';
import style from './page.module.css';

export default function Page() {

    return (
        <main className={style.all}>
                <Navbar></Navbar>
                <div className={style.middlePart}>
                    <Head></Head>
                    <EventsList></EventsList>
                </div>
                <CreateBtn></CreateBtn>
        </main>
    );
}
