import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4vkcYLzTqkGZuAA7ptkel-tR2TBadTrW8",
    authDomain: "samtupe-7fb06.firebaseapp.com",
    projectId: "samtupe-7fb06",
    storageBucket: "samtupe-7fb06.appspot.com",
    messagingSenderId: "563587575711",
    appId: "1:563587575711:web:0cd09d82a65a84be657aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
