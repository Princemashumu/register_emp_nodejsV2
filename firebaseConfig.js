
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-_Ia7EhtiGzK6Cd9s7NVbBGgVpyhYQYw",
  authDomain: "employee-registration-5087d.firebaseapp.com",
  projectId: "employee-registration-5087d",
  storageBucket: "employee-registration-5087d.appspot.com",
  messagingSenderId: "1082786057643",
  appId: "1:1082786057643:web:f51a7d951eaf194a1f56ee",
  measurementId: "G-0BDECXS3LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
