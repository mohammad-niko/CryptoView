import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgTOArinSEWbt08AVtsuWkrSmU9j3v4BI",
  authDomain: "cryptoauthapp-b09b5.firebaseapp.com",
  projectId: "cryptoauthapp-b09b5",
  storageBucket: "cryptoauthapp-b09b5.firebasestorage.app",
  messagingSenderId: "392358381956",
  appId: "1:392358381956:web:5886f3bdf445e759d8b5d1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, createUserWithEmailAndPassword, signInWithPopup };
