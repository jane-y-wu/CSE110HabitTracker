import firebase from 'firebase';
import { db } from './db';
import { Alert } from 'react-native';

export const addFriend = (friendCode) => {
  let currentUser = firebase.auth().currentUser.uid;
    db.ref().once('value', (snap) => {
        if (!snap.hasChild(friendCode))
            Alert.alert('There is no user with this friend code.');
        else if (snap.hasChild(firebase.auth().currentUser.uid + '/Friends/' + friendCode))
            Alert.alert('This friend has already been added.');
        else {
            db.ref(currentUser + '/Friends/' + friendCode).set({
                First: snap.child(friendCode + "/First").val(),
                Last: snap.child(friendCode + "/Last").val()
            });
            db.ref(friendCode + '/Friends/' + currentUser).set({
               First: snap.child(currentUser + "/First").val(),
               Last: snap.child(currentUser + "/Last").val()
            });
            Alert.alert('Friend added!');
        }
    });
}
