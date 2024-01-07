import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import Droplist from '@/componens/Droplist';
import { WebD1 } from '@/componens/svg2/WebD1';
import { WebD2 } from '@/componens/svg2/WebD2';
import { WebD3WebD3 } from '@/componens/svg2/WebD3';
import { WebDevelopment2 } from '@/componens/svg/index2-darkgrip';
import { WebDevelopment3 } from '@/componens/svg/index3';

import { useThemeContext } from '../Context/Filter/index';
import style from './index.module.css';

export default function Head() {
    // Aktuální datum a čas
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const currentTime = format(new Date(), 'HH:mm');
    /*obdrzeni contextu*/
    const { data, setData, OriginalData, setoRData, grip, setgrip } = useThemeContext();

    /*Filter Future*/
    const FilterFutureEvents = () => {
        const futureEvents =
            OriginalData?.filter((item) => {
                if (item.date > currentDate) {
                    return true;
                } else if (item.date === currentDate && item.time > currentTime) {
                    return true;
                } else {
                    return false;
                }
            }) ?? [];
        return futureEvents;
    };

    const handleFilterFutureEvents = () => {
        const futureEvents = FilterFutureEvents();
        setData(futureEvents);
        setPick({ all: false, past: false, future: true });
    };

    useEffect(() => {
        if (pick.all === true) {
            handleAllEvents();
        } else if (pick.future === true) {
            handleFilterFutureEvents();
        } else if (pick.past === true) {
            handleFilterPastEvents();
        }
    }, [OriginalData]);

    /*Past filter*/
    const FilterPastEvents = () => {
        const pastEvents = OriginalData?.filter((item) => {
            if (item.date < currentDate) {
                return true;
            } else if (item.date === currentDate && item.time < currentTime) {
                return true;
            } else {
                return false;
            }
        });
        return pastEvents;
    };

    const handleFilterPastEvents = () => {
        const pastEvents = FilterPastEvents();
        setData(pastEvents);
        setPick({ all: false, past: true, future: false });
        console.log('past events');
    };

    /*AllEvents Filter*/
    const handleAllEvents = () => {
        setData(OriginalData);
        setPick({ all: true, future: false, past: false });
        console.log('all events');
    };

    /*color changing*/
    const [pick, setPick] = useState({
        all: true,
        future: false,
        past: false,
    });

    return (
        <>
            <div className={style.categories}>
                <ul className={style.allEV}>
                    <li className={style.categorisShow}>SHOW:</li>
                    <li className={pick.all ? style.alEpick : style.alE} onClick={handleAllEvents}>
                        ALL EVENTS
                    </li>
                    <li
                        className={pick.future ? style.fEpcik : style.fE}
                        onClick={handleFilterFutureEvents}
                    >
                        FUTURE EVENTS
                    </li>
                    <li
                        className={pick.past ? style.pEpick : style.pE}
                        onClick={handleFilterPastEvents}
                    >
                        PAST EVENTS
                    </li>
                </ul>
                <ul className={style.allGrip}>
                    <li
                        role="button"
                        className={style.grip1}
                        onClick={() => {
                            setgrip(!grip);
                        }}
                    >
                        {grip === true ? <WebDevelopment2></WebDevelopment2> : <WebD1></WebD1>}
                    </li>
                    <li
                        role="button"
                        className={style.grip2}
                        onClick={() => {
                            setgrip(!grip);
                        }}
                    >
                        {grip === false ? <WebD2></WebD2> : <WebDevelopment3></WebDevelopment3>}
                    </li>
                </ul>
            </div>
        </>
    );
}
