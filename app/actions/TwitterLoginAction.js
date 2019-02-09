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
import { loaderToggle } from './LoaderAction';
import loader from '../reducers/loader';

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
                dispatch(loaderToggle());
                loginCustomFirebase(
                    'twitter',
                    data.authToken,
                    data.authTokenSecret
                )
                    .then(user => {
                        dispatch(receiveAuth(user));
                        dispatch(loaderToggle());
                        Actions.main({ type: ActionConst.REPLACE });
                    })
                    .catch(error => {
                        showAlert('Login Issue', error.message, 'OK');
                        dispatch(loaderToggle());
                        dispatch(receiveError(error));
                    });
            })
            .catch(error => {
                console.log('Twitter Login Error: ', error);
            });
    };
}
