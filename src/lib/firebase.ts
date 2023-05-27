// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxkwadZT7eHlMer8u-nT0yIQNO8CglPnw",
  authDomain: "comatch-7fbe0.firebaseapp.com",
  projectId: "comatch-7fbe0",
  storageBucket: "comatch-7fbe0.appspot.com",
  messagingSenderId: "340162018994",
  appId: "1:340162018994:web:076274fea2048269a2d3ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()


