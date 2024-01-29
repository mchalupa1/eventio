
import style from './index.module.css';
import { User } from '@/app/Context/auth';

export default function AttendeesList(props: { joiners: User[]; author: User }) {

    return (
        <div className={style.BoxJoiners}>
            <p className={style.attendees}>Attendees</p>
            <div className={style.allJoiners}>
                {props.joiners.map((user, index) => (
                    <div
                        key={index}
                        className={user?.fname === 'You' ? style.YouBox : style.joinerBox}
                    >
                        <p
                            className={user?.fname === 'You' ? style.You : style.joiner}
                        >{`${user?.fname} ${user?.lname}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
