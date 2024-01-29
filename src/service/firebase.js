// services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPy-bYty4re2m6ldEJ5T6PEbb1-0I820s",
  authDomain: "todo-c9e42.firebaseapp.com",
  projectId: "todo-c9e42",
  storageBucket: "todo-c9e42.appspot.com",
  messagingSenderId: "360568362943",
  appId: "1:360568362943:web:3e31debac6808b7598f30a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
