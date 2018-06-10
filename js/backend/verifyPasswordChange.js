import firebase from 'firebase';
import { Alert } from 'react-native'; 

export const verifyPassChange = (pass) => {
	if (pass.confirmPass !== pass.newPass) {
		Alert.alert("New passwords do not match.");
	} else if (firebase.auth().currentUser.email !== pass.email) {
		Alert.alert("Incorrect email");
	} else {
		firebase.auth().currentUser.updatePassword(pass.newPass);
		Alert.alert("Password changed");
	}
}