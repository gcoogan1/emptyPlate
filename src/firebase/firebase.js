import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//FIREBASE CONFIG

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "noemptyplate.firebaseapp.com",
  projectId: "noemptyplate",
  storageBucket: "noemptyplate.appspot.com",
  messagingSenderId: "45226729166",
  appId: "1:45226729166:web:8d0139caf8ca7b15c9fa9f",
  measurementId: "G-KLW1FM967T"
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
