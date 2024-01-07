import { format, isValid, parseISO } from 'date-fns';
import React from 'react';

import style from './index.module.css';

export default function DateTime(props: { grip: boolean; date: string; time: string }) {
    const dateObject = parseISO(props.date);
    const timeObject = parseISO(`1970-01-01T${props.time}`);

    const isValidDate = isValid(dateObject);
    const isValidTime = isValid(timeObject);

    const formattedDate = isValidDate ? format(dateObject, 'MMMM d, yyyy') : 'Invalid Date';
    const formattedTime = isValidTime ? format(timeObject, 'K:mm aa') : 'Invalid Time';

    return (
        <div className={props.grip ? style.alltime : style.alltime2}>
            <p className={props.grip ? style.date : style.date2}>
                {`${formattedDate} – ${formattedTime}`}
            </p>
        </div>
    );
}
