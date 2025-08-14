// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARyb1BAOIbUkaZzoI21G5gEj-KyrO4oYE",
  authDomain: "network-online-service-a8ffb.firebaseapp.com",
  projectId: "network-online-service-a8ffb",
  // storageBucket: "network-online-service-a8ffb.firebasestorage.app",
  storageBucket: "network-online-service-a8ffb.appspot.com",

  messagingSenderId: "755298212721",
  appId: "1:755298212721:web:a4dbf2aa7334c7fdc0f4d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB4VVGWXCRwE8V2Stjb9wslKhzYTcwRe-E",
//   authDomain: "nasmatics-course.firebaseapp.com",
//   projectId: "nasmatics-course",
//   storageBucket: "nasmatics-course.firebasestorage.app",
//   messagingSenderId: "443551351443",
//   appId: "1:443551351443:web:dc8deb333db326a09b0366"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

//  const auth = getAuth(app);
//  export default auth;