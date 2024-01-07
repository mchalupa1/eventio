'use client';

// Marking this file as a client entry
import { deleteCookie, setCookie } from 'cookies-next';
import { User as FirebaseAuthUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { AuthCookie } from '@/middleware';
import { auth } from '@/services/firebase/auth';
import { db } from '@/services/firebase/db';

type User = { uid: string; fname: string; lname: string; email: string };

type AuthContextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

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
                const idToken = await userData?.getIdToken();
                const userFromFetch = await fetchUser(userData.uid);

                if (idToken) setCookie(AuthCookie.IdToken, idToken);
                setUser(userFromFetch);
            } else {
                deleteCookie(AuthCookie.IdToken);
                setUser(undefined);
            }
        });

        return () => unsubscribe();
    }, []);

    const contextValue: AuthContextType = {
        user,
        setUser,
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
