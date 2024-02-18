'use client';

import {
    User as FirebaseAuthUser,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { auth } from '@/services/firebase/auth';
import { db } from '@/services/firebase/db';

import { deleteAuthCookie, setAuthCookie } from './utils';

export type User = { uid: string; fname: string; lname: string; email: string };

type AuthContextType = {
    user: User | undefined;
    login: (email: string, password: string) => Promise<FirebaseAuthUser>;
    register: (registerData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => Promise<FirebaseAuthUser>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const login = useCallback(async (email: string, password: string) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const { token: idToken, expirationTime } = await response.user.getIdTokenResult();

        setAuthCookie(idToken, expirationTime);

        return response.user;
    }, []);

    const register = useCallback(
        async ({
            firstName,
            lastName,
            email,
            password,
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
        }) => {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const { token: idToken, expirationTime } = await user.getIdTokenResult();

            await setDoc(doc(db, 'users', user.uid), {
                fname: firstName,
                lname: lastName,
                email,
            });
            setAuthCookie(idToken, expirationTime);

            return user;
        },
        [],
    );

    const fetchUser = async (uid: string): Promise<User | undefined> => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            const userData = docSnap.data();

            return userData ? ({ ...userData, uid } as User) : undefined;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return undefined;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userData: FirebaseAuthUser | null) => {
            if (userData) {
                const [{ token: idToken, expirationTime }, userFromFetch] = await Promise.all([
                    userData?.getIdTokenResult(),
                    fetchUser(userData.uid),
                ]);

                setAuthCookie(idToken, expirationTime);
                setUser(userFromFetch);
            } else {
                deleteAuthCookie();
                setUser(undefined);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [setUser]);

    const contextValue: AuthContextType = {
        login,
        register,
        user,
    };
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}
