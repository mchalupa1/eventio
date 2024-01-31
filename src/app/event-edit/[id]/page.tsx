'use client';
import { collection, deleteDoc, doc,updateDoc } from 'firebase/firestore';
import AttendeesList from '@/app/event-detail/[id]/components/Attendees';
import Loading from '@/componens/Loading/loading';
import Navbar from '@/componens/Navbar/navbar';
import { db } from '@/services/firebase/db';
import {Bin} from "@/componens/svg/Bin"
import style from './page.module.css';
import { useForm } from 'react-hook-form';
import { formatISO9075, isPast, isToday } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useEvents from '@/services/firebase/useDataHook';
import { Event } from '@/services/firebase/useDataHook';

type DetailsProps = {
    params: {
        id: string;
    };
};

const EventDetail: React.FC<DetailsProps> = ({ params }) => {
	const { push } = useRouter();
	const {OriginalData} = useEvents("events");
	const [data, setData] = useState<Event | undefined>();

	useEffect(() => {
        const eventData = OriginalData?.find((event) => event.id === params.id);
        setData(eventData);
    }, [OriginalData]);


	/*form things*/
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
        const docRef = doc(usersCollectionRef, data?.id);
		await updateDoc(docRef, {
            title: title,
            description: description,
            date: date,
            time: time,
            capacity: capacity,
        });
		push("/")
    });
	const DeleteEvent = async () => {
        try {
           const eventRef = doc(db, 'events', params.id);
            await deleteDoc(eventRef);
            push('/');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    return (

        <main>
            <Navbar />
            <div className={style.middlePart}>
				<div className={style.head}>
				<p className={style.idecko}>Detail event: {params.id}</p>
				<div className={style.delete}>
                <p className={style.bin} onClick={DeleteEvent}><Bin></Bin></p>
				<p className={style.deletetext} onClick={DeleteEvent}>DELETE EVENT</p>
				</div>
				</div>
                {data ? (
                    <div className={style.allBox}>
                        <div className={style.box}>
					  <form className={style.form} autoComplete="off" onSubmit={handle}>
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
							defaultValue={data.title}
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
							defaultValue={data.description}
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
							defaultValue={data.date}
                        />
                        <p>{errors.date?.message?.toString()}</p>
                        <input
                            type="time"
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
							defaultValue={data.time}
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
								validate:(fieldValue) => {
									if(fieldValue < data.joiners.length){
										return  "Small capacity."
									}else{
										return undefined
									}
								}
                            })}
                            placeholder="Capacity"
							defaultValue={data.capacity}
                        ></input>
                        <p>{errors.capacity?.message?.toString()}</p>
                        <input
                            type="Submit"
                            className={style.submit}
                            value="UPDATE THE EVENT"
                        ></input>
                    </div>
                </form>
						</div>
                        <AttendeesList joiners={data.joiners} author={data.author} />
                       </div>
                ) : (
                    <Loading />
                )}
            </div>
        </main>
    );
};

export default EventDetail;
function push(arg0: string) {
	throw new Error('Function not implemented.');
}

