'use client';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/Context/auth';
import BtnJoin from './Btns/joinbtn';
import BtnLeave from './Btns/leavebtn';
import style from './index.module.css';

export default function BtnEvent(props: {
    author: string;
    joiners: string; //joiners
    idec: string;
    capac: string; //capacity
}) {
    const { user } = useAuthContext();
    const { push } = useRouter();

	const Routing =(e:any) => {
		e.preventDefault();
	push('/event-edit/' + props.idec)
	}

    return (
        <>
            {
			(props.joiners.length === Number(props.capac))?
			(user && user.uid === props.author)?
			<button className={style.statusE} onClick={Routing}>
			EDIT
			</button>:
			(props.joiners.includes(user?.uid as string))?<BtnLeave uid={user?.uid as string} joiners={props.joiners} id={props.idec} />:<button className={style.filledBtn} onClick={(e) => {e.preventDefault()}}>FILLED</button>:
			(user && user.uid === props.author) ? (
				<button className={style.statusE} onClick={Routing}>
				EDIT
				</button>
			) : props.joiners.includes(user?.uid as string) ? (
			<BtnLeave uid={user?.uid as string} joiners={props.joiners} id={props.idec} />
			) : (
			<BtnJoin
				uid={user?.uid as string}
				joiners={props.joiners}
				id={props.idec}
				capac={props.capac}
			/>
			)
			}
        </>
    );
}
