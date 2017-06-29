import GoogleSignIn from 'react-native-google-sign-in';
import { setStorage } from './StorageAction';

export function googleSignIn() {
	return async function (dispatch) {
	    await GoogleSignIn.configure({
	    	clientID: '755065860133-74hubfe9bpe019rotvdmvgi4arq3vgg2.apps.googleusercontent.com',
	  		scopes: ['openid', 'profile', 'email'],
	  		shouldFetchBasicProfile: true,
	  	})

		try {
			const user = await GoogleSignIn.signInPromise();
			console.log(user);
			dispatch(setStorage(user.email));
		} catch(err) {
			console.log("Google Sign In Error");
		}
	}
}
