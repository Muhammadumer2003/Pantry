// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDajiNFYCUcHvWoo5KIqIxx3maGO2UgATE",
  authDomain: "pantry-d93ef.firebaseapp.com",
  projectId: "pantry-d93ef",
  storageBucket: "pantry-d93ef.appspot.com",
  messagingSenderId: "681152286438",
  appId: "1:681152286438:web:155bc7ed1f5e567531f527",
  measurementId: "G-N81LC47V5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Db=getFirestore(app);