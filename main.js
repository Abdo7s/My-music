import { auth, provider } from './firebase-config.js';
import { signInWithRedirect, getRedirectResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// معالجة نتيجة الدخول بعد إعادة التوجيه
getRedirectResult(auth).catch((error) => {
    console.error("خطأ في الدخول:", error.message);
});

// وظيفة الدخول عند الضغط على الزر
window.loginGoogle = () => {
    signInWithRedirect(auth, provider);
};

// مراقبة حالة المستخدم (هل سجل دخوله أم لا)
onAuthStateChanged(auth, (user) => {
    const loginScreen = document.getElementById('login-screen');
    if (user) {
        loginScreen.style.display = 'none';
        document.getElementById('user-img').src = user.photoURL || 'https://via.placeholder.com/40';
        console.log("مرحباً بك:", user.displayName);
    } else {
        loginScreen.style.display = 'flex';
    }
});

// وظيفة البحث وتشغيل الفيديوهات
window.startSearch = () => {
    const query = document.getElementById('search-input').value;
    const frame = document.getElementById('main-frame');
    const placeholder = document.getElementById('home-placeholder');

    if (query) {
        placeholder.style.display = 'none';
        frame.style.display = 'block';

        // إذا كان الرابط من يوتيوب، قم بتحويله لرابط Embed
        if (query.includes('youtube.com/watch?v=')) {
            const videoId = query.split('v=')[1].split('&')[0];
            frame.src = `https://www.youtube.com/embed/${videoId}`;
        } else if (query.includes('youtu.be/')) {
            const videoId = query.split('be/')[1].split('?')[0];
            frame.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            // بحث عادي عبر بينج (لأن جوجل يمنع الـ iframe أحياناً)
            frame.src = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        }
    }
};
