import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REPLACE THESE VALUES with the ones from your Firebase Console!
const firebaseConfig = {
  apiKey: "AIzaSyB4aqppe2StSZrixjLsW2rwH5S3lh71Nhs",
  authDomain: "repuestospagamenos-1e83e.firebaseapp.com",
  projectId: "repuestospagamenos-1e83e",
  storageBucket: "repuestospagamenos-1e83e.firebasestorage.app",
  messagingSenderId: "64171724950",
  appId: "1:64171724950:web:3ac97b70537b258c4d32b7",
  measurementId: "G-N9DESK4BC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the tools so we can import them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);