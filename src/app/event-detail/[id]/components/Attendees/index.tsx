import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/app/Context/auth';
import { db } from '@/services/firebase/db';

import style from './index.module.css';

type User = { fname: string; lname: string };

export default function AttendeesList(props: { joiners: string[] | string; authorUID: string }) {
    const { user } = useAuthContext();
    const [users, setUsers] = useState<User[]>([]);

    const fetchAllUsers = async () => {
        const allUsersSnap = await getDocs(collection(db, 'users'));
        let allUsersData: Record<string, User> = {};

        allUsersSnap.forEach((doc) => {
            const userData = doc.data() as User;
            allUsersData[doc.id] = userData;
        });

        return allUsersData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Array.isArray(props.joiners)) {
                    const userCache = await fetchAllUsers();

                    let usersData: User[] = [];

                    props.joiners.forEach((item) => {
                        let userData: User;

                        if (user && item === user.uid) {
                            userData = { fname: 'You', lname: '' };
                        } else {
                            userData = userCache[item];
                        }

                        usersData.push(userData);
                    });

                    setUsers(usersData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [props.joiners, user]);

    return (
        <div className={style.BoxJoiners}>
            <p className={style.attendees}>Attendees</p>
            <div className={style.allJoiners}>
                {users.map((user, index) => (
                    <div
                        key={index}
                        className={user?.fname === 'You' ? style.YouBox : style.joinerBox}
                    >
                        <p
                            className={user?.fname === 'You' ? style.You : style.joiner}
                        >{`${user?.fname} ${user?.lname}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
