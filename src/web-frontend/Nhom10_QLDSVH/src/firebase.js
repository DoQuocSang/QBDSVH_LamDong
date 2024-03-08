import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFwYV8rcRO_ZEV7wuoffhiCw3s9recALc",
  authDomain: "qbdsvhlamdong.firebaseapp.com",
  projectId: "qbdsvhlamdong",
  storageBucket: "qbdsvhlamdong.appspot.com",
  messagingSenderId: "956014786679",
  appId: "1:956014786679:web:b8d5245d9eb0074fe02e72",
  measurementId: "G-3EC3C4FT1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)