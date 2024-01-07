import { auth } from '@/services/firebase-admin/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authorization = request.headers.get('Authorization');

    try {
        if (!authorization) throw new Error();

        await auth.verifyIdToken(authorization);

        return Response.json({}, { status: 200 });
    } catch (error) {
        return Response.json({}, { status: 403 });
    }
}
