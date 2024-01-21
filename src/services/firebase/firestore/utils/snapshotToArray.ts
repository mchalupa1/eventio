import { type DocumentData, type QuerySnapshot } from 'firebase/firestore';

export function snapshotToArray<Data extends Record<string, unknown>>(
    snapshot: QuerySnapshot<Data>,
) {
    const data: Data[] = [];

    snapshot.forEach((result) => data.push(result.data()));

    return data;
}
