import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

export const fdConfig = {
  apiKey: "AIzaSyBn5NyvomKRBuywEaXZ0aAl_wKO7yr3Sg8",
  authDomain: "chamda-online.firebaseapp.com",
  databaseURL: "https://chamda-online.firebaseio.com",
  projectId: "chamda-online",
  storageBucket: "chamda-online.appspot.com",
  messagingSenderId: "1008614132927",
  appId: "1:1008614132927:web:e82fab044726b07c"
};

// react-redux-firebase config
export const rrfConfig = {
  serProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize Firebase
firebase.initializeApp(fdConfig);
firebase.firestore(); //.settings({ timestampsInSnapshots: true });

export default firebase;
