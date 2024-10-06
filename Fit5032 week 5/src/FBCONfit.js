import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGKqvVhKTvbf5V_zjWKvLanGq4n4JPWoc",
  authDomain: "week7-716f9.firebaseapp.com",
  projectId: "week7-716f9",
  storageBucket: "week7-716f9.appspot.com",
  messagingSenderId: "488328739727",
  appId: "1:488328739727:web:dca96fb36361c5483ae9fa"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { firebaseApp, db };

