import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBUyoc1jMGQCo7svFDgpLRWcG_nwAMs3bQ',
    authDomain: 'eventio-91b4f.firebaseapp.com',
    projectId: 'eventio-91b4f',
    storageBucket: 'eventio-91b4f.appspot.com',
    messagingSenderId: '688297603861',
    appId: '1:688297603861:web:ece30c8151ac78e914af1c',
    measurementId: 'G-S988XRPZTW',
};

export const app = initializeApp(firebaseConfig);

export default firebase;
