import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAC9HsSt8VQKyUikZCVt3fQjz4zg2yiers",
  authDomain: "food-delivery-app-d251c.firebaseapp.com",
  projectId: "food-delivery-app-d251c",
  storageBucket: "food-delivery-app-d251c.firebasestorage.app",
  messagingSenderId: "738569841160",
  appId: "1:738569841160:web:369b07d761c44d93e4bfbd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export { signInWithPopup };


