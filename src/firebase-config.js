// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh0PsyGPVMPqIy52sUh--KKElzKvkCcz0",
  authDomain: "project-egx.firebaseapp.com",
  projectId: "project-egx",
  storageBucket: "project-egx.appspot.com",
  messagingSenderId: "806055587785",
  appId: "1:806055587785:web:416ed587771d5791488218",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
