import firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBKpmexU8DE43UhG05dn0L_IaYBs0qqwZU',
  authDomain: 'publication-273509.firebaseapp.com',
  databaseURL: 'https://publication-273509.firebaseio.com',
  projectId: 'publication-273509',
  storageBucket: 'publication-273509.appspot.com',
  messagingSenderId: '390380467107',
  appId: '1:390380467107:web:419597492aa93edf1b2016',
  measurementId: 'G-P4F5ZF5ED4',
};

// Initialize Firebase with a "default" Firebase project
const app = firebase.initializeApp(
  config,
  process.env.BROWSER ? 'browser' : 'server',
);

// Option 1: Access Firebase services via the defaultProject variable
export const auth = app.auth();
export const database = app.database();
export const firestore = app.firestore();
