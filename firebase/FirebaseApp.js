import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// storage
import { getStorage } from "firebase/storage";

// AIzaSyAqeuzSU3r42rOVp2rREYnqdzBkCJwt-xI

const firebaseConfig = {
  apiKey: "AIzaSyAqeuzSU3r42rOVp2rREYnqdzBkCJwt-xI",
  authDomain: "friendfuse-53ad3.firebaseapp.com",
  projectId: "friendfuse-53ad3",
  storageBucket: "friendfuse-53ad3.appspot.com",
  messagingSenderId: "20472455431",
  appId: "1:20472455431:web:bd3b61549a1b6f17caa5a2"
};

// new

// const firebaseConfig = {
//   apiKey: "AIzaSyD4nFoR9qDCjxF9hD6O_88i5TgBS6jaIpo",
//   authDomain: "linkpls-728e2.firebaseapp.com",
//   projectId: "linkpls-728e2",
//   storageBucket: "linkpls-728e2.appspot.com",
//   messagingSenderId: "951303901719",
//   appId: "1:951303901719:web:c0fb2bc29d60126dbec252"
// };



// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
// export const auth=getAuth(app)
export const initFirebase=()=>{
    return app;
}