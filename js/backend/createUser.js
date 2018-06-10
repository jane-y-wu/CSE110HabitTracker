import firebase from 'firebase';
import { isLoggedIn } from './isLoggedIn';
import { signIn } from './signIn';
//import { db, auth } from './db';
import { Alert } from 'react-native';
/*
 * Function to create users in the firebase database.
 * Input: User email and password as strings.
 * Output: errorMessage if there is an error.
 */
export const createUser = (email, password, first, last) => firebase.auth().createUserWithEmailAndPassword(email, password)
