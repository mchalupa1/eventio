'use client';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/services/firebase/auth';

import style from './index.module.css';

const Dropmenu = () => {
    const logout = async () => {
        push('/login');
        await signOut(auth);
    };
    const { push } = useRouter();
    return (
        <div className={style.container}>
            <div className={style.all}>
                <ul className={style.ull}>
                    <li>
                        <Link
                            href={'/profile'}
                            style={{ textDecoration: 'none', color: '#9CA5AF' }}
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <button
                            className={style.btn}
                            onClick={logout}
                            style={{ textDecoration: 'none', color: '#9CA5AF' }}
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dropmenu;
