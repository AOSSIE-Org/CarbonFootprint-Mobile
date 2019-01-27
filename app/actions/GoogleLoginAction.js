/*
 *	Google Native Login Action
*/

import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { googleSignInConfig } from '../config/keys';
import * as actions from './AuthAction';
import { showAlert } from '../config/helper';
import { loginCustomFirebase } from './firebase/Auth';
import { KEYS_NOT_SET } from '../config/constants';

/**
 * google signin functionality to app
 * @return handling google login feature
 */
export function googleSignIn() {
    if (googleSignInConfig.clientID === null) {
        return alert(KEYS_NOT_SET);
    }
    return async (dispatch) => {
        await GoogleSignIn.configure(googleSignInConfig).then(() => {
            GoogleSignIn.signInPromise()
                .then(data => {
                    loginCustomFirebase(
                        'google',
                        data.idToken,
                        data.accessToken
                    )
                        .then(user => {
                            dispatch(actions.receiveAuth(user));
                            Actions.main({ type: ActionConst.REPLACE });
                        })
                        .catch(error => {
                            showAlert('Login Issue', error.message, 'OK');
                            dispatch(actions.receiveError(error));
                        });
                })
                .catch(error => {
                    console.log(error.message);
                });
        });
    }
};