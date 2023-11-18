// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuf5mArgdMilDglXFAcVB3AOzJAADoiEU",
  authDomain: "fcs-pro.firebaseapp.com",
  projectId: "fcs-pro",
  storageBucket: "fcs-pro.appspot.com",
  messagingSenderId: "585585039596",
  appId: "1:585585039596:web:f1d8b2616df8c2cc976dc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);