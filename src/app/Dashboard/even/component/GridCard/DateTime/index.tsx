import { format} from 'date-fns';
import React from 'react';

import style from './index.module.css';

export default function DateTime(props: { grip: boolean;  dateTime: Date}) {

    return (
        <div className={props.grip ? style.alltime : style.alltime2}>
            <p className={props.grip ? style.date : style.date2}>
			{format(props.dateTime ?? new Date(), 'MMMM d, yyyy - K:m aa')}
            </p>
        </div>
    );
}
