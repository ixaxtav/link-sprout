import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4S-gtPVAU4Xam_VAJXn7k16dFVjsn-PU",
  authDomain: "link-sprout.firebaseapp.com",
  projectId: "link-sprout",
  storageBucket: "link-sprout.appspot.com",
  messagingSenderId: "216981865945",
  appId: "1:216981865945:web:50dba004aefb0df25e05c8",
  measurementId: "G-ZDRNCC4H5F",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
