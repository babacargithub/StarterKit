// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGslWeJh6zESzt7fIQA4_kLTDAi64bxLQ",
  authDomain: "senapel.firebaseapp.com",
  projectId: "senapel",
  storageBucket: "senapel.appspot.com",
  messagingSenderId: "81496193478",
  appId: "1:81496193478:web:3faf3821e0ea575fe09ac7",
  measurementId: "G-RV9ZD266VF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
