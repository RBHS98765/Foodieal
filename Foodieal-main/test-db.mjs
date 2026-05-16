import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqJTOY5_RdhW901UXVIQvqK5mJsb9h_M4",
  authDomain: "foodieal-182ab.firebaseapp.com",
  projectId: "foodieal-182ab",
  storageBucket: "foodieal-182ab.firebasestorage.app",
  messagingSenderId: "324691515361",
  appId: "1:324691515361:web:eab9758d002a492b2164a0",
  measurementId: "G-YSVT9MNHKX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Testing Firestore Connection...");

addDoc(collection(db, "test_connections"), {
  message: "Automated test script confirming backend write access!",
  timestamp: serverTimestamp()
})
.then(() => {
  console.log("SUCCESS! Database write is working flawlessly.");
  process.exit(0);
})
.catch((err) => {
  console.error("FAIL", err.code, err.message);
  process.exit(1);
});
