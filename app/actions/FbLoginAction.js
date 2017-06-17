import { storeDataLocally } from './LocalStorage';
import { requestLogin , recieveLogin } from './SimpleAction';

export function initUser(token) {
  return function (dispatch) {
  	  dispatch(requestLogin());
	  fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
	  .then((response) => response.json())
	  .then((json) => {
	  	dispatch(storeDataLocally('UserName', json.name));
	    //alert("User Name : " + json.name) ;      
	  })
	  .catch((error) => {
	    alert('ERROR GETTING DATA FROM FACEBOOK : ' + error);
	  })
	  dispatch(recieveLogin());
	}
}