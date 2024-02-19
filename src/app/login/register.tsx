'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../Context/auth';
import style from './page.module.css';
import { useState } from 'react';

const Page = () => {

    const {
        formState: { errors },
        register,
        handleSubmit,
        watch,
        setError,
    } = useForm({
        mode: 'all',
    });

    const { register: registerNewUser } = useAuthContext();
    const { push } = useRouter();
	const [isLoading, setLoading] = useState(false);

    const submit = handleSubmit(async ({ email, password, firstName, lastName }) => {
		setLoading(true);
        try {
            await registerNewUser({ email, password, firstName, lastName });
            push('/');
        } catch (error) {
			setLoading(false)
            setError('email', {
                message: 'Invalid email',
            });
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
