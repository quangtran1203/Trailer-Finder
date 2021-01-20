// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB3rUcE5aD5cRFu45IVAa8ryLjDOrbw7yE",
    authDomain: "trailer-finder-58b7f.firebaseapp.com",
    projectId: "trailer-finder-58b7f",
    storageBucket: "trailer-finder-58b7f.appspot.com",
    messagingSenderId: "262570624148",
    appId: "1:262570624148:web:1cf71709727f2032a3a081",
    measurementId: "G-R7ZRDLD5M0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };