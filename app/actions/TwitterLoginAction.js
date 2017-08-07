/*
 * Twitter Native Login Action
*/

import { setStorage } from './StorageAction';
import TwitterAuth from 'tipsi-twitter';
import { twitterSignInConfig } from '../config/keys';

export function twitterLogin() {
    TwitterAuth.init(twitterSignInConfig);
    
    return async function(dispatch) {
        try {
          const result = await TwitterAuth.login()
          dispatch(setStorage(result.userName));
        } catch (error) {
          console.log('Twitter Login error:', error)
        }
    }
}
