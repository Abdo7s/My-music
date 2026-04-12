import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4vkcYLzTqkGZuAA7ptkmltR2T8adTrW8",
  authDomain: "samtupe-7fb06.firebaseapp.com",
  projectId: "samtupe-7fb06",
  storageBucket: "samtupe-7fb06.firebasestorage.app",
  messagingSenderId: "563587575711",
  appId: "1:563587575711:web:0cd090d82a65a84be657aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// تحديث الواجهة عند تغيير حالة المستخدم
onAuthStateChanged(auth, (user) => {
    const btn = document.getElementById('login-btn');
    const info = document.getElementById('user-info');
    if (user) {
        btn.innerText = "تسجيل الخروج";
        info.innerText = "أهلاً: " + user.email.split('@')[0];
    } else {
        btn.innerText = "تسجيل الدخول";
        info.innerText = "";
    }
});

// زر الدخول والخروج
document.getElementById('login-btn').onclick = () => {
    if (auth.currentUser) {
        signOut(auth);
    } else {
        signInWithPopup(auth, provider).catch(err => alert("خطأ: " + err.message));
    }
};

// حماية الروابط
window.checkAuthAndDownload = (url) => {
    if (auth.currentUser) {
        window.open(url, '_blank');
    } else {
        alert("🔒 للتحميل، يجب عليك تسجيل الدخول أولاً بالبريد الإلكتروني.");
    }
};
