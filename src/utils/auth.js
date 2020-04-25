import firebase from "firebase/app";
import {auth} from '../services/firebase';

// Sign up new users
export function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Sign in existing users
export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  let provider = new firebase.auth.OAuthProvider('google.com');
  return auth.signInWithRedirect(provider);
}

export function logout() {
  return auth.signOut();
}
