/*
	This is for social login using Google.
	Uses External package - 'react-native-google-sign-in'
*/

import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import { googleSignInConfig } from '../config/keys';
import { receiveAuth } from './AuthAction';

export function googleSignIn() {
	return function (dispatch) {
	    GoogleSignIn.configure(googleSignInConfig)
		.then(() => {
			GoogleSignIn.signInPromise()
			.then((data) => {
				console.log(data);
				const credential = firebase.auth.GoogleAuthProvider
									.credential(data.idToken, data.accessToken);
				console.log(credential);
				firebase.auth().signInWithCredential(credential)
				.then((user) => {
					dispatch(receiveAuth(user));
					Actions.main({type: ActionConst.RESET});
					Actions.calculate();
				})
			})
			.catch((error) => {
				console.log("Google Sign in Error: ", error);
			})
		})
	}
}
