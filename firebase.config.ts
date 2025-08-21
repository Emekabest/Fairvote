import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBMNajarkF50SDNRhsXNvsfAtUqhBTPNoM",
  authDomain: "fairvote-8314c.firebaseapp.com",
  projectId: "fairvote-8314c",
  storageBucket: "fairvote-8314c.appspot.com",
  messagingSenderId: "430436542498",
  appId: "1:430436542498:web:f18319e92dd4403040827b",
  measurementId: "G-7PGK8WM506",
  databaseURL: "https://fairvote-8314c-default-rtdb.europe-west1.firebasedatabase.app",
};



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


export { app, db };

