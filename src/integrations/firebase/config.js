import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu43G4gImFmO2QtQVkb3BCPSdqFCHUFRY",
  authDomain: "joseph-oguti.firebaseapp.com",
  projectId: "joseph-oguti",
  storageBucket: "joseph-oguti.firebasestorage.app",
  messagingSenderId: "195317784451",
  appId: "1:195317784451:web:dd37d33006da9144e560b6",
  measurementId: "G-K2KHNKXVKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
