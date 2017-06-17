import { storeDataLocally } from './LocalStorage';
import { requestLogin , recieveLogin } from './SimpleAction';
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export function fbLogin() {
	return function (dispatch) {
	  	dispatch(requestLogin());
		
		LoginManager.logInWithReadPermissions(['public_profile']).then(
		  function(result) {
		    if (result.isCancelled) {
		      alert('Login cancelled');
		    } else {
		      AccessToken.getCurrentAccessToken().then(
		          (data) => {
		          	fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + data.accessToken)
					  .then((response) => response.json())
					  .then((json) => {
					  	dispatch(storeDataLocally('UserName', json.name));
					    //alert("User Name : " + json.name) ;      
					  })
					  .catch((error) => {
					    alert('ERROR GETTING DATA FROM FACEBOOK : ' + error);
					  })
		          } 
		       )
		    }
		  },
		  function(error) {
		    alert('Login failed with error: ' + error);
		  }
		);
		
		dispatch(recieveLogin());
	}
}