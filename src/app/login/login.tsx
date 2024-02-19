'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../Context/auth';
import style from './page.module.css';
import { useState } from 'react';

const Page = () => {
    const {
        formState: { errors},
        register,
        handleSubmit,
        setError,
    } = useForm({
        mode: 'all',
    });

    const { push } = useRouter();
    const { login } = useAuthContext();
	const [isLoading, setLoading] = useState(false);


    const submit = handleSubmit(async ({ email, password }) => {
		setLoading(true);
        try {
            await login(email, password);
            push('/');
        } catch (error) {
			setLoading(false)
            setError('password', {
                message: 'Invalid email or password',
            });
            setError('email', {
                message: 'Invalid email or password',
            });
            console.log(error);
        }
    });

    return (
        <div className={style.box}>
            <p className={style.title}>Sign in to Eventio.</p>
            {errors.email || errors.password ? (
                <p className={style.undertitleE}>
                    Oops! That email and password combination is not valid.
                </p>
            ) : (
                <p className={style.undertitle}>Enter your details below.</p>
            )}
            <form className={style.form} onSubmit={submit} autoComplete="off">
                <input
                    className={errors.email ? style.errorInput : style.INEmail}
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    type="text"
                ></input>
                <input
                    className={errors.password ? style.errorInput : style.INPassword}
                    placeholder="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                    })}
                ></input>
                {isLoading ? (
                    <button className={style.loadingBtn}>LOADING...</button>
                ) : (
                    <input type="submit" className={style.btn} value="SIGN IN"></input>
                )}
            </form>
        </div>
    );
};

export default Page;
