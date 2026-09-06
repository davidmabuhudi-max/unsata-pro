import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCH4OA2Xf_eoj7kld1rnwEI6lsuU1xBeGQ",
  authDomain: "unsata-cms-15b69.firebaseapp.com",
  projectId: "unsata-cms-15b69",
  storageBucket: "unsata-cms-15b69.firebasestorage.app",
  messagingSenderId: "911893911313",
  appId: "1:911893911313:web:55637755985fa8a1161eb0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;