import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBTm_7ix8LMgWMZuIXpIOS2mIGJWc6nT-E",
  authDomain: "create-app-like-twitter.firebaseapp.com",
  projectId: "create-app-like-twitter",
  storageBucket: "create-app-like-twitter.appspot.com",
  messagingSenderId: "917612902347",
  appId: "1:917612902347:web:75edc4f79e19596fbf284e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;