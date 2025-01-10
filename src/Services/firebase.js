// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// กำหนดค่า Firebase Config (แทนค่าด้านล่างด้วยค่าของคุณ)
const firebaseConfig = {
    apiKey: "AIzaSyCIt3AgknIuS9Conou3G7MLBffZO1iATJ4",
    authDomain: "login-test-app-11bd2.firebaseapp.com",
    projectId: "login-test-app-11bd2",
    storageBucket: "login-test-app-11bd2.firebasestorage.app",
    messagingSenderId: "639326219481",
    appId: "1:639326219481:web:d2b2840f8a4f05ee8ee2c8",
    measurementId: "G-EWT7KVQ3SL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db }; // Export db เพื่อใช้งานในส่วนอื่น
