import firebase from 'firebase'
import {Alert} from 'react-native'
/*
 * Signs a currently logged in user out.
 * Returns true if successful or false if an error occured.
 */
export const signOut = () => {
  firebase.auth().signOut().then(function() {
    return true;
  }).catch(function(error) {
    Alert.alert("didn't sign out");
    return false;    // An error happened.
  });
}
