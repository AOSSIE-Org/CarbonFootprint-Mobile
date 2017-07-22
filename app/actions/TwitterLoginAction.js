/*
 * Twitter Native Login Action
*/

import { setStorage } from './StorageAction';
import TwitterAuth from 'tipsi-twitter';

export function twitterLogin() {
    TwitterAuth.init({
        twitter_key: 'QYaiChXS6T0LeJ5Jt23QxctEh',
        twitter_secret: 'wTyZxZ1POhV8Doqydw9oQAUTQZJJvr3q7IO7NA0nRGNV4g4gUY',
    });
    
    return async function(dispatch) {
        try {
          const result = await TwitterAuth.login()
          dispatch(setStorage(result.userName));
        } catch (error) {
          console.log('Twitter Login error:', error)
        }
    }
}
