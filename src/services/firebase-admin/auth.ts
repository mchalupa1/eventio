import { getAuth } from 'firebase-admin/auth';

import { admin } from '.';

export const auth = getAuth(admin);
