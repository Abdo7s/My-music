import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4vkcYLzTqkGZuAA7ptkmltR2T8adTrW8",
  authDomain: "samtupe-7fb06.firebaseapp.com",
  databaseURL: "https://samtupe-7fb06-default-rtdb.firebaseio.com", // رابط قاعدة البيانات
  projectId: "samtupe-7fb06",
  appId: "1:563587575711:web:0cd090d82a65a84be657aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// فتح وإغلاق القائمة
document.getElementById('open-menu').onclick = () => document.getElementById('sidebar').classList.toggle('active');

// مراقبة حالة المستخدم
onAuthStateChanged(auth, (user) => {
    const adminBtn = document.getElementById('admin-add-btn');
    const authBtn = document.getElementById('auth-btn');
    if (user) {
        authBtn.innerText = "تسجيل الخروج";
        document.getElementById('user-name').innerText = "أهلاً، " + user.displayName.split(' ')[0];
        // استبدل الإيميل بإيميلك الحقيقي لتتمكن من إضافة الموسيقى
        if (user.email === "your-email@gmail.com") adminBtn.style.display = "block";
    } else {
        authBtn.innerText = "تسجيل الدخول";
        document.getElementById('user-name').innerText = "";
        adminBtn.style.display = "none";
    }
});

// وظيفة تسجيل الدخول
document.getElementById('auth-btn').onclick = () => {
    if (auth.currentUser) signOut(auth);
    else signInWithPopup(auth, provider);
};

// جلب الموسيقى من قاعدة البيانات وعرضها
const musicRef = ref(db, 'songs');
onValue(musicRef, (snapshot) => {
    const container = document.getElementById('music-container');
    container.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        container.innerHTML += `
            <div class="card">
                <img src="${data.img}" alt="Cover">
                <h4>${data.title}</h4>
                <button class="btn-main" onclick="downloadMusic('${data.url}')"><i class="fas fa-download"></i> تحميل</button>
            </div>
        `;
    });
});

// وظيفة رفع موسيقى جديدة (للمشرف)
window.uploadMusic = () => {
    const title = document.getElementById('s-title').value;
    const img = document.getElementById('s-img').value;
    const url = document.getElementById('s-url').value;
    
    if (title && img && url) {
        const newSongRef = push(ref(db, 'songs'));
        set(newSongRef, { title, img, url }).then(() => {
            alert("تم النشر بنجاح!");
            closeModal();
        });
    } else {
        alert("يرجى ملء جميع الخانات");
    }
};

window.downloadMusic = (url) => {
    if (auth.currentUser) window.open(url, '_blank');
    else alert("🔒 التحميل متاح للمشتركين فقط. يرجى تسجيل الدخول.");
};

window.openModal = () => document.getElementById('modal').style.display = "flex";
window.closeModal = () => document.getElementById('modal').style.display = "none";
