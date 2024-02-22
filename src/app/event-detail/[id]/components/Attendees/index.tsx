
import style from './index.module.css';
import { User, useAuthContext } from '@/app/Context/auth';

export default function AttendeesList(props: { joiners: User[]}) {
	const {user} = useAuthContext();

    return (
        <div className={style.BoxJoiners}>
            <p className={style.attendees}>Attendees</p>
            <div className={style.allJoiners}>
                {props.joiners.map((joiner, index) => (
                    <div
                        key={index}
                        className={user?.uid === joiner.uid?  style.YouBox : style.joinerBox}
                    >
                        <p
                        >{user?.uid === joiner.uid ? "You" : `${joiner.fname} ${joiner.lname}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}





