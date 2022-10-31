// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBME_duwiAFeCqxIZ2iYU6nNv46897hfR8",
  authDomain: "academia-90de9.firebaseapp.com",
  projectId: "academia-90de9",
  storageBucket: "academia-90de9.appspot.com",
  messagingSenderId: "3944865273",
  appId: "1:3944865273:web:6e87e417996953107f3128"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// console.log('auth in firebase',auth);
export const db = getFirestore(app);
export default app;


// persisting the user in local storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error in setPersistence', errorCode, errorMessage);
      });