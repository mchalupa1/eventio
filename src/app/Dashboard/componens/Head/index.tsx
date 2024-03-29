'use client';
import { WebD1 } from '@/componens/svg2/WebD1';
import { WebD2 } from '@/componens/svg2/WebD2';
import { WebDevelopment2 } from '@/componens/svg/index2-darkgrip';
import { WebDevelopment3 } from '@/componens/svg/index3';
import style from './index.module.css';

interface HeadProps {
	grip: boolean;
	toggleGrip: () => void;
	pick: any;
	FilterAllEvents: () => void;
	FilterFutureEvents: () => void;
	FilterPastEvents: () => void;
  }


export default function Header({ grip, toggleGrip, pick, FilterAllEvents, FilterFutureEvents, FilterPastEvents }: HeadProps) {

    return (
        <header>
            <nav className={style.categories}>
                <ul className={style.allEV}>
                    <li className={style.categorisShow}>SHOW:</li>
                    <li className={pick.all ? style.alEpick : style.alE} onClick={FilterAllEvents}>
                        ALL EVENTS
                    </li>
                    <li
                        className={pick.future ? style.fEpcik : style.fE}
                        onClick={FilterFutureEvents}
                    >
                        FUTURE EVENTS
                    </li>
                    <li
                        className={pick.past ? style.pEpick : style.pE}
                        onClick={FilterPastEvents}
                    >
                        PAST EVENTS
                    </li>
                </ul>
                <ul className={style.allGrip}>
                    <li
                        role="button"
                        className={style.grip1}
                        onClick={toggleGrip}
                    >
                        {grip === true ? <WebDevelopment2></WebDevelopment2> : <WebD1></WebD1>}
                    </li>
                    <li
                        role="button"
                        className={style.grip2}
                        onClick={toggleGrip}
                    >
                        {grip === false ? <WebD2></WebD2> : <WebDevelopment3></WebDevelopment3>}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
