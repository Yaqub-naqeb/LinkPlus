import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAqeuzSU3r42rOVp2rREYnqdzBkCJwt-xI",
  authDomain: "friendfuse-53ad3.firebaseapp.com",
  projectId: "friendfuse-53ad3",
  storageBucket: "friendfuse-53ad3.appspot.com",
  messagingSenderId: "20472455431",
  appId: "1:20472455431:web:bd3b61549a1b6f17caa5a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export const auth=getAuth(app)
export const initFirebase=()=>{
    return app;
}