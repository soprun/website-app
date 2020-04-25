// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBKpmexU8DE43UhG05dn0L_IaYBs0qqwZU",
  authDomain: "publication-273509.firebaseapp.com",
  databaseURL: "https://publication-273509.firebaseio.com",
  projectId: "publication-273509",
  storageBucket: "publication-273509.appspot.com",
  messagingSenderId: "390380467107",
  appId: "1:390380467107:web:419597492aa93edf1b2016",
  measurementId: "G-P4F5ZF5ED4"
};

// Initialize Firebase with a "default" Firebase project
let app = firebase.initializeApp(config, process.env.BROWSER ? 'browser' : 'server');

// console.log(defaultProject.name); // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
export let auth = app.auth();
export let database = app.database();
export let firestore = app.firestore();

// export const defaultAuth = firebase.auth();
// export const defaultDatabase = firebase.database();
