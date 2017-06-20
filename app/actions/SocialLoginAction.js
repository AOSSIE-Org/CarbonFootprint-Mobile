import { storeDataLocally } from './LocalStorage';
import { requestLogin , receiveLogin } from './SimpleAction';
import { facebook, google, twitter, tumblr } from 'react-native-simple-auth';

export function socialLogin(id) {
	let obj;

	switch(id) {
		case '1': {
			obj = twitter({
			      	appId: 'QYaiChXS6T0LeJ5Jt23QxctEh',
			      	appSecret: 'wTyZxZ1POhV8Doqydw9oQAUTQZJJvr3q7IO7NA0nRGNV4g4gUY',
			      	callback: 'carbonfootprint1://authorize'
			      });
			break;
		}
		case '2': {
			obj = tumblr({
			      	appId: 'WXRAmlcvoqzfpAdnWEZMA3qb12K6RwcZifK4k0RxLlbYw9bEpj',
			      	appSecret: 'iXDBItysj3HExPVk0aOl2aUOKY2a5wjyhDklCAdDQWTbv5NBQG',
			      	callback: 'carbonfootprint2://authorize'
			      });
			break;
		}
		default: {
			obj = null;
		}
	}

	return function (dispatch) {
	  	dispatch(requestLogin());
		obj.then((info) => {
		  dispatch(storeDataLocally('UserName', info.user.name));
		}).catch((error) => {
		  alert("Error : " + error.description);
		});
		dispatch(receiveLogin());
	}
}