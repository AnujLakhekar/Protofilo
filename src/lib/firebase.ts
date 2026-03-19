import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_SOUDPQYwHEX3fOCdN4xwfEJVcf2VbSM",
  authDomain: "protofilo-447b0.firebaseapp.com",
  projectId: "protofilo-447b0",
  storageBucket: "protofilo-447b0.firebasestorage.app",
  messagingSenderId: "574113921950",
  appId: "1:574113921950:web:138cfe1e2cef3c29eeb48f",
  measurementId: "G-TY6ZPGNLLV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
