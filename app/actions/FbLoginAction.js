/*
	This is for social login using Facebook.
*/
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import * as firebase from 'firebase';
import { receiveAuth } from './AuthAction';

export function fbLogin() {
	return function (dispatch) {
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
		  function(result) {
		    if (result.isCancelled) {
		      alert('Login cancelled');
		    } else {
		      AccessToken.getCurrentAccessToken().then(
				  (data) => {
					  const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
					  firebase.auth().signInWithCredential(credential)
					  .then((user) => {
						  dispatch(receiveAuth(user));
						  Actions.main({type: ActionConst.RESET});
			              Actions.calculate();
					  })
				  }
		          /*
				  (data) => {
		          	fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + data.accessToken)
					  .then((response) => response.json())
					  .then((json) => {

					  })
					  .catch((error) => {
					    alert('FB ERROR GETTING DATA FROM FACEBOOK : ' + error);
					  })
		          }
				  */
		       )
		    }
		  },
		  function(error) {
		    alert('FB Login failed with error: ' + error);
		  }
		);
	}
}
