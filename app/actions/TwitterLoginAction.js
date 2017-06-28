import TwitterAuth from 'tipsi-twitter';
import { setStorage } from './StorageAction';

export function twitterLogin() {
    TwitterAuth.init({
        twitter_key: 'QYaiChXS6T0LeJ5Jt23QxctEh',
        twitter_secret: 'wTyZxZ1POhV8Doqydw9oQAUTQZJJvr3q7IO7NA0nRGNV4g4gUY',
    });

    return async function(dispatch) {
        try {
          const result = await TwitterAuth.login()
          console.log(result);
          dispatch(setStorage(result.userName));
        } catch (error) {
          console.log('Twitter Login error:', error)
        }
    }

}
