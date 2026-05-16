import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqJTOY5_RdhW901UXVIQvqK5mJsb9h_M4",
  authDomain: "foodieal-182ab.firebaseapp.com",
  projectId: "foodieal-182ab",
  storageBucket: "foodieal-182ab.firebasestorage.app",
  messagingSenderId: "324691515361",
  appId: "1:324691515361:web:eab9758d002a492b2164a0",
  measurementId: "G-YSVT9MNHKX"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
