import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC98Ncp0tM42oZVckrVO6GENU3lGJZapak",
    authDomain: "h-mkt-p.firebaseapp.com",
    projectId: "h-mkt-p",
    storageBucket: "h-mkt-p.appspot.com",
    messagingSenderId: "1037026753408",
    appId: "1:1037026753408:web:467f643dc3fc869734df65",
    measurementId: "G-PFZM3BZ391"
  };

  //calling the initialize app method
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore()
