'use client';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { db } from '@/services/firebase/db';

import style from './page.module.css';

const Page = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        watch,
    } = useForm({
        mode: 'all',
    });

    const auth = getAuth();
    const { push } = useRouter();
    const [loading, setloading] = useState(false);

    const submit = handleSubmit(async ({ email, password, firstName, lastName }) => {
        setloading(true);
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const uid = user.user.uid;

            await setDoc(doc(db, 'users', uid), {
                fname: firstName,
                lname: lastName,
                email: email,
            });
            push('/');
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className={style.box}>
            <p className={style.title}>Get started absolutely free.</p>
            {errors.email ||
            errors.repeatPassword ||
            errors.password ||
            errors.firstName ||
            errors.lastName ? (
                <p className={style.undertitleE}>Oops! This is not valid.</p>
            ) : (
                <p className={style.undertitle}>Enter your details below.</p>
            )}
            <form className={style.form} onSubmit={submit} autoComplete="off">
                <input
                    className={errors.firstName ? style.errorInput : style.INfirstname}
                    placeholder="First name"
                    {...register('firstName', {
                        required: 'First name is required',
                        minLength: {
                            value: 3,
                            message: 'Oops! That email and password combination is not valid.',
                        },
                    })}
                ></input>
                <input
                    className={errors.lastName ? style.errorInput : style.INlastname}
                    placeholder="Last name"
                    {...register('lastName', {
                        required: 'Last name is required',
                        minLength: {
                            value: 3,
                            message: 'Oops! That email and password combination is not valid.',
                        },
                    })}
                ></input>
                <input
                    className={errors.email ? style.errorInput : style.INEmail}
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Oops! That email and password combination is not valid.',
                        },
                    })}
                ></input>
                <input
                    type="password"
                    className={errors.password ? style.errorInput : style.INPassword}
                    placeholder="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Oops! That email and password combination is not valid.',
                        },
                    })}
                ></input>
                <input
                    type="password"
                    className={errors.repeatPassword ? style.errorInput : style.INRepeatPassword}
                    placeholder="Repeat password"
                    {...register('repeatPassword', {
                        required: 'Repeat password is required',
                        minLength: {
                            value: 6,
                            message: 'Oops! That email and password combination is not valid.',
                        },
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return 'Your passwords do no match';
                            }
                        },
                    })}
                ></input>
                {loading ? (
                    <button className={style.loadingBtn}>LOADING...</button>
                ) : (
                    <input type="submit" className={style.btn} value="SIGN IN"></input>
                )}
            </form>
        </div>
    );
};

export default Page;
