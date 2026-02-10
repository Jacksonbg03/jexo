import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "jexo-73a47.firebaseapp.com",
  projectId: "jexo-73a47",
  storageBucket: "jexo-73a47.firebasestorage.app",
  messagingSenderId: "470488892703",
  appId: "1:470488892703:web:bb50c9e44f87a457195c2a",
  measurementId: "G-E8HR3QSZGJ"
};

export const app = initializeApp(firebaseConfig);