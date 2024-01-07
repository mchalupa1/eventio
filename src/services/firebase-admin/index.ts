import { getApps, initializeApp } from 'firebase-admin/app';

const initializedApp = getApps().at(0);

export const admin = initializedApp
    ? initializedApp
    : initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
