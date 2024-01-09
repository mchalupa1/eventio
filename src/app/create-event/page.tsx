'use client';

import { compareAsc, format, isFuture, isToday, startOfDay } from 'date-fns';
import { addDays, formatISO9075, isPast } from 'date-fns';
import { onAuthStateChanged } from 'firebase/auth';
import {
    DocumentReference,
    addDoc,
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Navbar from '@/componens/Navbar/navbar';
import { Logo } from '@/componens/svg/Logo';
import { auth } from '@/services/firebase/auth';
import { db } from '@/services/firebase/db';

import { useAuthContext } from '../Context/auth';
import style from './page.module.css';
import { X } from './svg/X';

const Page = () => {
    const { user } = useAuthContext();
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const [formDate, setformDate] = useState<Date>();

    const usersCollectionRef = collection(db, 'events');

    const handle = handleSubmit(async ({ title, description, date, time, capacity }) => {
        const colRef = await addDoc(usersCollectionRef, {
            authorUID: user?.uid,
            title: title,
            description: description,
            date: date,
            time: time,
            capacity: capacity,
            joiners: [],
        });
        const docRef = doc(usersCollectionRef, colRef.id);
        console.log(docRef);
        await updateDoc(docRef, { id: colRef.id });
    });
    return (
        <main className={style.app}>
            <nav className={style.navbar}>
                <Link href="/" className={style.logo}>
                    <Logo></Logo>
                </Link>
                <div className={style.CloseX}>
                    <Link href={'/'} className={style.X}>
                        <X></X>
                    </Link>
                    <Link href={'/'} style={{ textDecoration: 'none' }} className={style.close}>
                        Close
                    </Link>
                </div>
            </nav>
            <div className={style.box}>
                <form className={style.form} autoComplete="off" onSubmit={handle}>
                    <div className={style.boxfooter}>
                        <span className={style.Create}>Create new event</span>
                        <span className={style.info}>Enter details below</span>
                    </div>

                    <div className={style.inputs}>
                        <input
                            className={errors.title ? style.input : style.input2}
                            {...register('title', {
                                required: 'Title is required',
                                minLength: {
                                    value: 3,
                                    message: 'Title must be atlesat 3 characters long',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Title must be atmost 20 characters long',
                                },
                            })}
                            placeholder="Title"
                        ></input>
                        <p>{errors.title?.message?.toString()}</p>
                        <input
                            className={errors.description ? style.input : style.input2}
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 3,
                                    message: 'Description must be atlesat 3 characters long',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Description must be atmost 50 characters long',
                                },
                            })}
                            placeholder="Description"
                        ></input>
                        <p>{errors.description?.message?.toString()}</p>
                        <input
                            type="date"
                            className={errors.date ? style.input : style.input2}
                            placeholder="Date"
                            {...register('date', {
                                required: 'Date is required',
                                validate: (fieldValue) => {
                                    const selectedDate = new Date(fieldValue);
                                    setformDate(selectedDate);
                                    if (isToday(selectedDate)) {
                                        return undefined; // Vrátí undefined, pokud je datum dnešní
                                    } else if (isPast(selectedDate)) {
                                        return 'The date is in the past';
                                    } else {
                                        return undefined; // Vrátí undefined, pokud datum není dnešní ani v minulosti
                                    }
                                },
                            })}
                        />
                        <p>{errors.date?.message?.toString()}</p>
                        <input
                            type="text"
                            className={errors.time ? style.input : style.input2}
                            {...register('time', {
                                required: 'Time is required',
                                validate: (selectedTime) => {
                                    if (formDate && isToday(formDate)) {
                                        const currentTime = formatISO9075(new Date(), {
                                            representation: 'time',
                                        });
                                        if (selectedTime < currentTime) {
                                            return 'Time is in the past';
                                        } else {
                                            return undefined;
                                        }
                                    } else {
                                        return undefined;
                                    }
                                },
                            })}
                            placeholder="Time"
							onFocus={(e) => (e.target.type = "time")}
                            onBlur={(e) => (e.target.type = "text")}
                        />
                        <p>{errors.time?.message?.toString()}</p>
                        <input
                            className={errors.capacity ? style.input : style.input2}
                            type="number"
                            {...register('capacity', {
                                required: 'Capacity is required',
                                min: { value: 1, message: 'Minimum is 1' },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Only numbers are allowed',
                                },
                            })}
                            placeholder="Capacity"
                        ></input>
                        <p>{errors.capacity?.message?.toString()}</p>
                        <input
                            type="Submit"
                            className={style.submit}
                            value="CREATE NEW EVENT"
                        ></input>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;
