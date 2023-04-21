import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCTjKzxxysAHlALeqWCAS9u2vTlcJXPM_E",
  authDomain: "webreactjs-8c6f7.firebaseapp.com",
  projectId: "webreactjs-8c6f7",
  storageBucket: "webreactjs-8c6f7.appspot.com",
  messagingSenderId: "183059456577",
  appId: "1:183059456577:web:92a21309541906c913dcc0",
  
};
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, db, storage}
