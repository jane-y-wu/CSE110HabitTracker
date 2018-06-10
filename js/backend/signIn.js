import firebase from 'firebase';
import {Alert} from 'react-native';
/*
 * Function that signs in a user to the database. 
 * Input: User email and password.
 * Output: Error code if there is a problem with the login.
 */
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
