import firebase from 'firebase';
/*
 * A function that checks with firebase auth if user is logged in.
 * If they are, it returns their unique uid.
 * If not, it just returns false.
 */
export const isLoggedIn = () => {
  var user = firebase.auth().currentUser;
  if(user){
    return(user.uid);
  }
  else{
    return false;
  }
}
