import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

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

function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("auth or window not available");

    const { subscribe } = writable(null);

    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
