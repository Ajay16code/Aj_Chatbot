
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARUDBwf66Dpsl1Dw1FMUptend71TxiMrY",
  authDomain: "chatbot-412f3.firebaseapp.com",
  projectId: "chatbot-412f3",
  storageBucket: "chatbot-412f3.firebasestorage.app",
  messagingSenderId: "392526194962",
  appId: "1:392526194962:web:76f24bc7efbc3798072bcb",
  measurementId: "G-EH6PJ5DQWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);