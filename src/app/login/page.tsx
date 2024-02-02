'use client';
import { useState } from 'react';
import { Logo } from '@/componens/svg/Logo';
import Login from './login';
import style from './page.module.css';
import Register from './register';


const Page = () => {

    const [LoginBox, setLoginBox] = useState(true);

    return (
        <div className={style.all}>
            <nav className={style.navbar}>
                <div className={style.logo}>
                    <Logo></Logo>
                </div>
                <div className={style.Account}>
                    {LoginBox ? (
                        <p className={style.dont}>Don’t have account?</p>
                    ) : (
                        <p className={style.already}>Already have an account?</p>
                    )}
                    <p className={style.singup} onClick={() => setLoginBox(!LoginBox)}>
                        {LoginBox ? 'SIGN UP' : 'SING IN'}
                    </p>
                </div>
            </nav>
            <main className={style.middlePart}>
                {LoginBox ? <Login></Login> : <Register></Register>}
            </main>
        </div>
    );
};

export default Page;
