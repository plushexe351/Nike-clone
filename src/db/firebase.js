import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9RjPWHPoYilH-CBEtY1GnjJroeOVWSNA",
  authDomain: "nikeclone-f723d.firebaseapp.com",
  projectId: "nikeclone-f723d",
  storageBucket: "nikeclone-f723d.appspot.com",
  messagingSenderId: "1007738510496",
  appId: "1:1007738510496:web:e83665ece75dcb57407dc5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  db,
  storage,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  ref,
  deleteDoc,
  uploadBytes,
  getDownloadURL,
};
