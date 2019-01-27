/*
 *	Facebook Native Login Action
*/
import FBSDK, {
    LoginManager,
    LoginButton,
    AccessToken
} from 'react-native-fbsdk';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { receiveAuth, receiveError } from './AuthAction';
import { showAlert } from '../config/helper';
import { loginCustomFirebase } from './firebase/Auth';

/**
 * handles login functionality by facebook in the app
 * @return function handling login
 */
export function fbLogin() {
    return function(dispatch) {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function(result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        loginCustomFirebase('facebook', data.accessToken, null)
                            .then(user => {
                                dispatch(receiveAuth(user));
                                Actions.main({ type: ActionConst.REPLACE });
                            })
                            .catch(error => {
                                showAlert('Login Issue', error.message, 'OK');
                                dispatch(receiveError(error));
                            });
                    });
                }
            },
            function(error) {
                console.log('FB Login failed with error: ' + error);
            }
        );
    };
}
