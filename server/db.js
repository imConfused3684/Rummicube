import firebaseMain from 'firebase/compat/app';
//require('firebase/compat/firestore');
import "firebase/compat/firestore";
import config from "./config.js";

export const firebase = firebaseMain.initializeApp(config.firebaseConfig);