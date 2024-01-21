import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "bytebooks-1574e.firebaseapp.com",
  projectId: "bytebooks-1574e",
  storageBucket: "bytebooks-1574e.appspot.com",
  messagingSenderId: "463440876089",
  appId: "1:463440876089:web:8e40590d862b82e1aff3e8",
};

export const app = initializeApp(firebaseConfig);
