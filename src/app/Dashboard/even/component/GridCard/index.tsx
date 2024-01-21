import Link from 'next/link';

import DateTime from './DateTime';
import Description from './Description';
import LowerPartGrip from './LowerPart';
import LowerPartRow from './LowerPartRow';
import Mentor from './Mentor';
import Title from './Title';
import style from './index.module.css';

interface GridCardProps {
    id: string;
    title: string;
    description: string;
    dateTime: Date;
    capacity: number;
    joiners: string[];
    authorUID: string;
    grip: boolean;
}

export default function GridCard({
    id,
    dateTime,
    title,
    description,
    capacity,
    joiners,
    authorUID,
    grip,
}: GridCardProps) {
    return (
        <Link
            href={`/event-detail/${id}`}
            style={{ textDecoration: 'none' }}
            className={grip ? style.GridOneBox : style.RowOneBox}
            key={id}
        >
            <DateTime grip={grip} dateTime={dateTime} />

            <Title grip={grip} title={title}></Title>
            <Mentor grip={grip} authorUID={authorUID}></Mentor>
            <Description grip={grip} description={description}></Description>
            {grip ? (
                <LowerPartGrip
                    grip={grip}
                    joiners={joiners}
                    capacity={capacity}
                    authorUID={authorUID}
                    idecko={id}
                ></LowerPartGrip>
            ) : (
                <LowerPartRow
                    grip={grip}
                    joiners={joiners}
                    capacity={capacity}
                    authorUID={authorUID}
                    idecko={id}
                ></LowerPartRow>
            )}
        </Link>
    );
}
