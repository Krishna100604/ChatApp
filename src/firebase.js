
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import{getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDti1iDo04ZKz05sr3qnL3pN35s8-CIZwQ",
  authDomain: "chat-43eae.firebaseapp.com",
  projectId: "chat-43eae",
  storageBucket: "chat-43eae.appspot.com",
  messagingSenderId: "383952227719",
  appId: "1:383952227719:web:a17c2a186723e6f40dd722"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();