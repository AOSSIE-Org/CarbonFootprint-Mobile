/*
 * Twitter Native Login Action
*/

import TwitterAuth from 'tipsi-twitter';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { twitterSignInConfig } from '../config/keys';
import { receiveAuth, receiveError } from './AuthAction';
import { showAlert } from '../config/helper';
import { loginCustomFirebase } from './firebase/Auth';
import { KEYS_NOT_SET } from '../config/constants';

/**
 * twitter login functionality in app
 * @return handling twitter login
 */
export function twitterLogin() {
  if (twitterSignInConfig.twitter_key === null) {
    return alert(KEYS_NOT_SET);
  }
  TwitterAuth.init(twitterSignInConfig);
  return dispatch => {
    TwitterAuth.login()
      .then(data => {
        loginCustomFirebase('twitter', data.authToken, data.authTokenSecret)
          .then(user => {
            dispatch(receiveAuth(user));
            Actions.main({ type: ActionConst.RESET });
          })
          .catch(error => {
            showAlert('Login Issue', error.message, 'OK');
            dispatch(receiveError(error));
          });
      })
      .catch(error => {
        console.log('Twitter Login Error: ', error);
      });
  };
}
