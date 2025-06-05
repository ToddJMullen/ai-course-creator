// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tut-ai-course-generator-d99e1.firebaseapp.com",
  projectId: "tut-ai-course-generator-d99e1",
  storageBucket: "tut-ai-course-generator-d99e1.firebasestorage.app",
  messagingSenderId: "550817765766",
  appId: "1:550817765766:web:a52fd34c509563a2787407",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export storage access
export const storage = getStorage(app);
