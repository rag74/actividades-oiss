// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-lToTxAD8Yd00Wy31iHPCiY2BM0Q2xSc",
    authDomain: "actividades-oiss.firebaseapp.com",
    projectId: "actividades-oiss",
    storageBucket: "actividades-oiss.appspot.com",
    messagingSenderId: "639267377389",
    appId: "1:639267377389:web:ec878a83ac757bf015bce4"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

export const auth = getAuth();

const db = getFirestore();
export default db