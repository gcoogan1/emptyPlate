import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//FIREBASE CONFIG

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "meal-cuisine.firebaseapp.com",
    databaseURL: "https://meal-cuisine.firebaseio.com",
    projectId: "meal-cuisine",
    storageBucket: "meal-cuisine.appspot.com",
    messagingSenderId: "980323071959",
    appId: "1:980323071959:web:3a83cb97f4cd02f9e8bd92",
    measurementId: "G-N7PT3Y74HS"
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
