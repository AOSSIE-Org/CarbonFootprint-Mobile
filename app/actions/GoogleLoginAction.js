/*
 *	Google Native Login Action
*/

import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import { googleSignInConfig } from '../config/keys';
import {
	receiveAuth,
	receiveError
} from './AuthAction';
import { loginCustomFirebase } from './firebase/Auth';

export function googleSignIn() {
	if(googleSignInConfig.clientID === null) {
		return alert("keys are not set, hence this functionality is disabled")
	}
	return function (dispatch) {
	    GoogleSignIn.configure(googleSignInConfig)
		.then(() => {
			GoogleSignIn.signInPromise()
			.then((data) => {
				loginCustomFirebase("google", data.idToken, data.accessToken)
				.then((user) => {
					dispatch(receiveAuth(user));
					Actions.main({type: ActionConst.RESET});
				})
				.catch((error) => {
					dispatch(receiveError(error));
				})
			})
			.catch((error) => {
				console.log(error.message);
			})
		})
	}
}