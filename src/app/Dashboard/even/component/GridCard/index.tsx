'use client';

import Link from 'next/link';

import { Event } from '@/app/Dashboard';

import DateTime from './DateTime';
import Description from './Description';
import LowerPartGrip from './LowerPart';
import LowerPartRow from './LowerPartRow';
import Mentor from './Mentor';
import Title from './Title';
import style from './index.module.css';

export default function GridCard(props: { data: Event[]; grip: boolean }) {
    return (
        <div className={props.grip === false ? style.allBoxsgrip : style.allBoxs}>
            {props.data.map((item) => {
                const { id, date, title, description, capacity, joiners, time, authorUID } = item;
                return (
                    <Link
                        href={`/event-detail/${item.id}`}
                        style={{ textDecoration: 'none' }}
                        className={props.grip ? style.GridOneBox : style.RowOneBox}
                        key={id}
                    >
                        <DateTime grip={props.grip} date={date} time={time}></DateTime>
                        <Title grip={props.grip} title={title}></Title>
                        <Mentor grip={props.grip} authorUID={authorUID}></Mentor>
                        <Description grip={props.grip} description={description}></Description>
                        {props.grip ? (
                            <LowerPartGrip
                                grip={props.grip}
                                joiners={joiners}
                                capacity={capacity}
                                authorUID={authorUID}
                                idecko={id}
                            ></LowerPartGrip>
                        ) : (
                            <LowerPartRow
                                grip={props.grip}
                                joiners={joiners}
                                capacity={capacity}
                                authorUID={authorUID}
                                idecko={id}
                            ></LowerPartRow>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
