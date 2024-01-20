'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Logo } from '@/componens/svg/Logo';

import Login from './login';
import style from './page.module.css';
import Register from './register';
import image2 from './svg/273ad2cb59513e9290e4bbabe5b3bcb2.png';

const Page = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const [eye, seteye] = useState(true);
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
