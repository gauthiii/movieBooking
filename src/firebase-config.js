// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCcGLJ_f7P3FH4MrQTzdyuMj_jlNLPi0go",
    authDomain: "freelance-projects-785eb.firebaseapp.com",
    projectId: "freelance-projects-785eb",
    storageBucket: "freelance-projects-785eb.appspot.com",
    messagingSenderId: "1015343371386",
    appId: "1:1015343371386:web:e78123f434a80f7279d7c3",
    measurementId: "G-TJJNDX3J3R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };