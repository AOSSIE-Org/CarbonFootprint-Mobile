/*
 * Twitter Native Login Action
*/

import TwitterAuth from 'tipsi-twitter';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import { twitterSignInConfig } from '../config/keys';
import { receiveAuth, receiveError } from './AuthAction';

export function twitterLogin() {
    TwitterAuth.init(twitterSignInConfig);
    return (dispatch) => {
        TwitterAuth.login()
        .then((data) => {
            const credential = firebase.auth.TwitterAuthProvider
                                    .credential(data.authToken, data.authTokenSecret);
            firebase.auth().signInWithCredential(credential)
            .then((user) => {
                dispatch(receiveAuth(user));
                Actions.main({type: ActionConst.RESET});
                Actions.calculate();
            })
            .catch((error) => {
                dispatch(receiveError(error));
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

}
