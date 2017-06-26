import TwitterAuth from 'tipsi-twitter';
import { requestLogin, receiveLogin } from './SimpleAction';
import { storeDataLocally } from './LocalStorage';
import { Actions } from 'react-native-router-flux';

export function twitterLogin() {
    TwitterAuth.init({
        twitter_key: 'QYaiChXS6T0LeJ5Jt23QxctEh',
        twitter_secret: 'wTyZxZ1POhV8Doqydw9oQAUTQZJJvr3q7IO7NA0nRGNV4g4gUY',
    });

    return async function(dispatch) {
        dispatch(requestLogin());
        try {
          const result = await TwitterAuth.login();
            if(dispatch(storeDataLocally('token', result.userName)))
                Actions.main();
        } catch (error) {
          console.log('Login error:', error)
        }
        dispatch(receiveLogin());
    }

}
