/*
 *	Facebook Native Login Action
 */
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import { receiveAuth, receiveError } from './AuthAction';
import { loaderToggle } from './LoaderAction';
import { showAlert } from '../config/helper';
import { loginCustomFirebase } from './firebase/Auth';
import { checkValidityForSignIn } from './firebase/Helper';

/**
 * handles login functionality by facebook in the app
 * @return function handling login
 */
export function fbLogin() {
    return async function(dispatch) {
        await LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function(result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        dispatch(loaderToggle());
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                dispatch(loaderToggle());
                                dispatch(receiveError(error));
                            } else {
                                checkValidityForSignIn(result.email, 'facebook.com')
                                    .then(result => {
                                        loginCustomFirebase('facebook', data.accessToken, null)
                                            .then(user => {
                                                dispatch(receiveAuth(user));
                                                dispatch(loaderToggle());
                                                Actions.main({
                                                    type: ActionConst.REPLACE
                                                });
                                            })
                                            .catch(error => {
                                                showAlert('Login Issue', error.message, 'OK');
                                                dispatch(loaderToggle());
                                                dispatch(receiveError(error));
                                            });
                                    })
                                    .catch(error => {
                                        dispatch(loaderToggle());
                                        if (error.code === 'REDIRECT_SIGN_IN') {
                                            // email id is already registered with another account of a different auth provider
                                            dispatch(redirectSignIn(error.userInfo.provider));
                                        } else {
                                            dispatch(receiveError(error));
                                        }
                                    });
                            }
                        };

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: data.accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email'
                                    }
                                }
                            },
                            responseInfoCallback
                        );

                        // Start the graph request to get user details
                        new GraphRequestManager().addRequest(infoRequest).start();
                    });
                }
            },
            function(error) {
                console.log('FB Login failed with error: ' + error);
                if (error == 'Error: User logged in as different Facebook user.')
                    LoginManager.logOut();
            }
        );
    };
}
