// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDau8Vp3Ilx2cJWwfD14aW2Y8yFvcraP9M",
  authDomain: "smartorders-d518a.firebaseapp.com",
  projectId: "smartorders-d518a",
  storageBucket: "smartorders-d518a.firebasestorage.app",
  messagingSenderId: "99840365401",
  appId: "1:99840365401:web:97bab66a4e79fd18617248"
};

// Initialize Firebase only if no app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export default app;