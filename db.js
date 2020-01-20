import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDKHlaz1QSkY2HEkfSPjPRFTj82g2YKfU8",
  authDomain: "messages-d9468.firebaseapp.com",
  databaseURL: "https://messages-d9468.firebaseio.com",
  projectId: "messages-d9468",
  storageBucket: "messages-d9468.appspot.com",
  messagingSenderId: "339033228222",
  appId: "1:339033228222:web:cb654253623fc915262fef",
  measurementId: "G-T930CDKS7B"
});

export default firebase.firestore();
