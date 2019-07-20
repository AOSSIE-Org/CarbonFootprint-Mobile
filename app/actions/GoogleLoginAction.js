/*
 *	Google Native Login Action
 */

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { loaderToggle } from './LoaderAction';
import { Actions, ActionConst } from 'react-native-router-flux';
import { googleSignInConfig } from '../config/keys';
import * as actions from './AuthAction';
import { showAlert } from '../config/helper';
import { loginCustomFirebase } from './firebase/Auth';
import { KEYS_NOT_SET } from '../config/constants';
import { checkValidityForSignIn, redirectSignIn } from './firebase/Helper';

/**
 * google signin functionality to app
 * @return handling google login feature
 */
export function googleSignIn() {
    if (googleSignInConfig.webClientId === null) {
        return alert(KEYS_NOT_SET);
    }
    return async dispatch => {
        GoogleSignin.configure(googleSignInConfig);
        try {
            dispatch(loaderToggle());
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const tokens = await GoogleSignin.getTokens();
            await checkValidityForSignIn(userInfo.user.email, 'google.com');
            loginCustomFirebase('google', tokens.idToken, tokens.accessToken)
                .then(user => {
                    dispatch(actions.receiveAuth(user));
                    dispatch(loaderToggle());
                    Actions.main({
                        type: ActionConst.REPLACE
                    });
                })
                .catch(error => {
                    dispatch(loaderToggle());
                });
        } catch (error) {
            dispatch(loaderToggle());
            if (error.code === 'REDIRECT_SIGN_IN') {
                // email id is already registered with another account of a different auth provider
                dispatch(redirectSignIn(error.userInfo.provider));
            } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
}
