import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDevBeidTT6zemFIA6S_FJV5l2f6-o0FA4",
  authDomain: "jobpilot-17ae5.firebaseapp.com",
  projectId: "jobpilot-17ae5",
  storageBucket: "jobpilot-17ae5.appspot.com",
  messagingSenderId: "713141779725",
  appId: "1:713141779725:web:29231f96947c52e2128444",
  measurementId: "G-6NG8MMFRFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export { auth, provider, app , storage };