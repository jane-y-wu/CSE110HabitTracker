import firebase from 'firebase';
/*
 * Configuration file for the database.
 * Exports db which is the initialized database.
 */
let config = {
  apiKey: "AIzaSyDqkAa5qwOrfxFHM5o7C6oTe61R8x5-8xg",
  authDomain: "habittrackerdev.firebaseapp.com",
  databaseURL: "https://habittrackerdev.firebaseio.com",
  projectId: "habittrackerdev",
  storageBucket: "habittrackerdev.appspot.com",
  messagingSenderId: "481081808202"
};

let app = firebase.initializeApp(config);
export const db = app.database();
export const auth = firebase.auth();
