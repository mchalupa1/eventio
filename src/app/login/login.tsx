'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../Context/auth';
import style from './page.module.css';

const Page = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        setError,
    } = useForm({
        mode: 'all',
    });
    const { push } = useRouter();
    const { login } = useAuthContext();

    const submit = handleSubmit(async ({ email, password }) => {
        try {
            const user = await login(email, password);
            push('/');
        } catch (error) {
            setError('email', { message: 'problem' });
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
                    className={errors.email || errors.password? style.errorInput:style.INEmail}
                    placeholder="Email"
                    {...register('email')}
					type="text"
                ></input>
                <input
                    className={errors.email || errors.password? style.errorInput:style.INEmail}
                    type={ 'password'}
                    placeholder="Password"
                    {...register('password')}
                ></input>
                <input type="submit" className={style.btn} value="SIGN IN"></input>
            </form>
        </div>
    );
};

export default Page;
