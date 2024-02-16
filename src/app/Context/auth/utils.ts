import { deleteCookie, setCookie } from 'cookies-next';
import { differenceInSeconds } from 'date-fns';

import { AuthCookie } from '@/middleware';

export const setAuthCookie = (idToken: string, expiration: string) =>
    setCookie(AuthCookie.IdToken, idToken, {
        sameSite: true,
        secure: true,
        maxAge: differenceInSeconds(new Date(expiration), Date.now()),
    });

export const deleteAuthCookie = () => deleteCookie(AuthCookie.IdToken);
