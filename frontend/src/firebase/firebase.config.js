
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKrU7glhdxiigzTwWdqpy6GC2uWOfZDvU",
//   authDomain: "learning-quiz-platfrom.firebaseapp.com",
//   projectId: "learning-quiz-platfrom",
//   storageBucket: "learning-quiz-platfrom.firebasestorage.app",
//   messagingSenderId: "631802761873",
//   appId: "1:631802761873:web:583f3a74cafda1b618e530",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export default auth;



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL3NPeHT7YoDYo1yJ07WVxWDT2LUYWx4k",
  authDomain: "shapion-quiz-platform.firebaseapp.com",
  projectId: "shapion-quiz-platform",
  storageBucket: "shapion-quiz-platform.firebasestorage.app",
  messagingSenderId: "430631071879",
  appId: "1:430631071879:web:f48e6d58b089227d560822"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;