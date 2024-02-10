import { format } from 'date-fns';
import React from 'react';

import style from './index.module.css';

export default function DateTime(props: { grip: boolean; date: string; time:string}) {
	const startsAt = new Date(`${props.date} ${props.time}`);

    return (
        <div className={props.grip ? style.alltime : style.alltime2}>
            <p className={props.grip ? style.date : style.date2}>
			{format(startsAt, 'MMMM d, yyyy - K:mm aa')}
            </p>
        </div>
    );
}
