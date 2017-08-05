/*
	This is for social login using Google.
	It configures GoogleSignIn object using required details such as clientID, scopes etc.
	then gets signin Promise object by calling signInPromise() function.
	From this Promise object, we get user's details.
	Used External package - 'react-native-google-sign-in'
*/

import { setStorage } from './StorageAction';
import GoogleSignIn from 'react-native-google-sign-in';
import { googleSignInConfig } from '../config/keys';

export function googleSignIn() {
	return async function (dispatch) {

		// Configuring GoogleSignIn object
	    await GoogleSignIn.configure(googleSignInConfig)
		try {

			// Getting Promise object
			const user = await GoogleSignIn.signInPromise();

			// Storing user's email in Local storage by dispatching setStorage action
			dispatch(setStorage(user.email));
		} catch(err) {
			console.log("Google Sign In Error");
		}
	}
}
