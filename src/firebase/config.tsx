// src/firebase/config.tsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // ✅ Firestore for user profiles
import { getDatabase } from 'firebase/database';    // ✅ Realtime DB for forum
import { getAnalytics } from 'firebase/analytics';

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);   // ✅ use this in AuthContext for user data
export const rtdb = getDatabase(app);  // ✅ use this in your forum feature
export const analytics = getAnalytics(app);

export default app;
