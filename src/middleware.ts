import { type NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/', '/profile', '/create-event', '/event-detail', '/event-edit'],
};

export enum AuthCookie {
    IdToken = 'idToken',
}

const signOut = (request: NextRequest) => {
    const origin = `${request.nextUrl.protocol}//${request.headers.get('host')}`;
    const response = NextResponse.redirect(new URL('/login', origin));

    response.cookies.delete(AuthCookie.IdToken);

    return response;
};

const middleware = async (request: NextRequest) => {
    const origin = `${request.nextUrl.protocol}//${request.headers.get('host')}`;
    const idToken = request.cookies.get(AuthCookie.IdToken)?.value ?? '';
    const response = await fetch(`${origin}/api/auth`, {
        method: 'GET',
        headers: { authorization: idToken },
    });

    if (!response.ok) return signOut(request);
};

export default middleware;
