import firebase  from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDDFodr2nv3UqRnwi_R8tIOsCUMHjXv0xY",
  authDomain: "nightbook-45069.firebaseapp.com",
  projectId: "nightbook-45069",
  storageBucket: "nightbook-45069.appspot.com",
  messagingSenderId: "294335428793",
  appId: "1:294335428793:web:e5647c9afa0260e51c0368"
};

 const app = firebase.initializeApp(firebaseConfig)


  //  Auth
  const google = new firebase.auth.GoogleAuthProvider();
  const fire = firebase

  // Firestore
  const db = app.firestore()

  // storage

  const storage = firebase.storage()

  // Settings
  const firestore = firebase.firestore();

  
  const settings = { timestampsInSnapshots: true};

  firestore.settings(settings);

  


  export { firestore , google , fire , db  , firebase , storage}