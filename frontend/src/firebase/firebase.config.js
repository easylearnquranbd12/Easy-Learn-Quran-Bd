import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJXC8QMDBY0UaUR5guu6nNORT8r6CDZrw",
  authDomain: "easy-learn-quran-bd.firebaseapp.com",
  projectId: "easy-learn-quran-bd",
  storageBucket: "easy-learn-quran-bd.firebasestorage.app",
  messagingSenderId: "160333781138",
  appId: "1:160333781138:web:3b2b0a10694256bd9cee4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
