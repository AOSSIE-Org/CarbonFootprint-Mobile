/*
 * Twitter Native Login Action
*/

import TwitterAuth from 'tipsi-twitter';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import { twitterSignInConfig } from '../config/keys';
import {
    receiveAuth,
    receiveError
} from './AuthAction';
import { loginCustomFirebase } from './firebase/Auth';

export function twitterLogin() {
    TwitterAuth.init(twitterSignInConfig);
    return (dispatch) => {
        TwitterAuth.login()
        .then((data) => {
            loginCustomFirebase("twitter", data.authToken, data.authTokenSecret)
            .then((user) => {
                dispatch(receiveAuth(user));
                Actions.main({type: ActionConst.RESET});
            })
            .catch((error) => {
                dispatch(receiveError(error));
            })
        })
        .catch((error) => {
            console.log("Twitter Login Error: ", error);
        })
    }
}