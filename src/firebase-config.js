import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0Z-z0MoyH2LXJ-ag6d0MZUvmvOSFieBA",
  authDomain: "spotify-auth-20ff5.firebaseapp.com",
  projectId: "spotify-auth-20ff5",
  storageBucket: "spotify-auth-20ff5.firebasestorage.app",
  messagingSenderId: "628779255591",
  appId: "1:628779255591:web:9cdb6a615802556ec08b02"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;




