'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../Context/auth';
import style from './page.module.css';

const Page = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        mode: 'all',
    });
    const { push } = useRouter();
    const { login } = useAuthContext();
    const [loading, setloading] = useState(false);
	const [formError, setFormError] = useState(false);

    const submit = handleSubmit(async ({ email, password }) => {
		setloading(true)
		try {
            const user = await login(email, password);
            push('/');
        } catch (error) {
			setFormError(true);
            console.log(error);
        }
    });

    return (
        <div className={style.box}>
            <p className={style.title}>Sign in to Eventio.</p>
            {formError || errors.email || errors.password ? (
                <p className={style.undertitleE}>
                    Oops! That email and password combination is not valid.
                </p>
            ) : (
                <p className={style.undertitle}>Enter your details below.</p>
            )}
            <form className={style.form} onSubmit={submit} autoComplete="off">
                <input
                    className={errors.email? style.errorInput:style.INEmail}
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    type="text"
                ></input>
                <input
                    className={errors.password? style.errorInput: style.INPassword}
                    placeholder="Password"
					type='password'
                    {...register('password',{
						required:"Password is required",
					})}
                ></input>
                {loading ? <button className={style.loadingBtn}>LOADING...</button>:<input type="submit" className={style.btn} value="SIGN IN"></input> }
            </form>
        </div>
    );
};

export default Page;
