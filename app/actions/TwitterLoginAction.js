/*
  This is for social login using Twitter.
  It initializes TwitterAuth object using required details such as twitter_key, twitter_secret.
  then gets Promise object by calling login() function.
  From this Promise object, we get user's details.
  Used External package - 'tipsi-twitter' 
*/

import { setStorage } from './StorageAction';
import TwitterAuth from 'tipsi-twitter';

export function twitterLogin() {

    // Initializing TwitterAuth object
    TwitterAuth.init({
        twitter_key: 'QYaiChXS6T0LeJ5Jt23QxctEh',
        twitter_secret: 'wTyZxZ1POhV8Doqydw9oQAUTQZJJvr3q7IO7NA0nRGNV4g4gUY',
    });
    return async function(dispatch) {
        try {

          // Getting Promise object
          const result = await TwitterAuth.login()

          // Storing user's email in Local storage by dispatching setStorage action 
          dispatch(setStorage(result.userName));
        } catch (error) {
          console.log('Twitter Login error:', error)
        }
    }
}
