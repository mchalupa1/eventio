// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUyoc1jMGQCo7svFDgpLRWcG_nwAMs3bQ",
  authDomain: "eventio-91b4f.firebaseapp.com",
  projectId: "eventio-91b4f",
  storageBucket: "eventio-91b4f.appspot.com",
  messagingSenderId: "688297603861",
  appId: "1:688297603861:web:ece30c8151ac78e914af1c",
  measurementId: "G-S988XRPZTW",
  // databsaeURL:
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
