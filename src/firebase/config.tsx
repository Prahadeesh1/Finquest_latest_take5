// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIpQEksUxxObvO67lTNeCV1IhdpL3jAT4",
  authDomain: "finquest-4e97e.firebaseapp.com",
  databaseURL: "https://finquest-4e97e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finquest-4e97e",
  storageBucket: "finquest-4e97e.firebasestorage.app",
  messagingSenderId: "218019555541",
  appId: "1:218019555541:web:16887cc32e58a7da7b5a5c",
  measurementId: "G-QP6J37R7V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;