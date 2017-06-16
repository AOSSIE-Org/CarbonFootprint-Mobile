import { storeDataLocally } from './LocalStorage';

function fetchUser(token) {
  return function (dispatch) {
	  fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
	  .then((response) => response.json())
	  .then((json) => {
	  	dispatch(storeDataLocally('UserName', json.name));
	    //alert("User Name : " + json.name) ;      
	  })
	  .catch((error) => {
	    alert('ERROR GETTING DATA FROM FACEBOOK : ' + error);
	  })
	}
}

export function initUser(token) {
	return (dispatch) => {
		dispatch(fetchUser(token));
	}
} 