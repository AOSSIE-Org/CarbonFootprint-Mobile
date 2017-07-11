/*
	This is for social login using Facebook. 
	This redirects user to native Facebook app and after login, it gets Access Token.
	From Access Token, user's details (such as Email ID) are fetched using Facebook's Graph API. 
	Used External package - 'react-native-fbsdk'
*/

import { setStorage } from './StorageAction';
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export function fbLogin() {
	return function (dispatch) {
		
		// Permissions to take from user
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
		  function(result) {
		    if (result.isCancelled) {
		      alert('Login cancelled');
		    } else { // If login successful
		      
		      // Getting Access Token and fetching user data from Facebook's Graph API
		      AccessToken.getCurrentAccessToken().then(
		          (data) => {
		          	fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + data.accessToken)
					  .then((response) => response.json())
					  .then((json) => {
					  	
					  	// Storing user's email in Local storage by dispatching setStorage action 
					  	dispatch(setStorage(json.email));
					  })
					  .catch((error) => {
					    alert('FB ERROR GETTING DATA FROM FACEBOOK : ' + error);
					  })
		          }
		       )
		    }
		  },
		  function(error) {
		    alert('FB Login failed with error: ' + error);
		  }
		);
	}
}
