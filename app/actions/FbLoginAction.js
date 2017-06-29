import { setStorage } from './StorageAction';
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export function fbLogin() {
	return function (dispatch) {
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
		  function(result) {
		    if (result.isCancelled) {
		      alert('Login cancelled');
		    } else {
		      AccessToken.getCurrentAccessToken().then(
		          (data) => {
					console.log(data);
		          	fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + data.accessToken)
					  .then((response) => response.json())
					  .then((json) => {
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
