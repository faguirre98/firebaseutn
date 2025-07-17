import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDmRwA3JJFM_duWpyQKJ1LG4wVv7q_SxIU",
    authDomain: "productos-utn-55343.firebaseapp.com",
    projectId: "productos-utn-55343",
    storageBucket: "productos-utn-55343.firebasestorage.app",
    messagingSenderId: "602264397319",
    appId: "1:602264397319:web:86c72abef8a5fa329baca2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };