import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAhWAhUgNf9LWVG0aNJwutTJ8ejmd3JUo",
  authDomain: "vueapp-1a72d.firebaseapp.com",
  projectId: "vueapp-1a72d",
  storageBucket: "vueapp-1a72d.appspot.com",
  messagingSenderId: "631174311210",
  appId: "1:631174311210:web:46106e621a5b3b4b0d0253",
  measurementId: "G-VBDQ0EG6XN",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
