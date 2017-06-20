import GoogleSignIn from 'react-native-google-sign-in';
import { storeDataLocally } from './LocalStorage';
import { requestLogin , receiveLogin } from './SimpleAction';

export function googleSignIn() {
	return async function (dispatch) {
  	  	dispatch(requestLogin());
	    await GoogleSignIn.configure({
	    	clientID: '755065860133-74hubfe9bpe019rotvdmvgi4arq3vgg2.apps.googleusercontent.com',
	  		scopes: ['openid', 'profile', 'email'],
	  		shouldFetchBasicProfile: true,
	  	});
	 
	  const user = await GoogleSignIn.signInPromise();
	  dispatch(storeDataLocally('UserName', user.name));
	  dispatch(receiveLogin());
	}
}