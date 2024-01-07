'use client';

import style from './index.module.css';

const Droplist = () => {
    return (
        <div className={style.container}>
            <div className={style.all}>
                <ul className={style.ull}>
                    <li>FUTURE EVENTS</li>
                    <li>PAST EVENTS</li>
                </ul>
            </div>
        </div>
    );
};

export default Droplist;
