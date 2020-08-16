import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import { Actions, ActionConst } from 'react-native-router-flux';
import { initFirebase } from './firebase/Init';
import { registerFirebase, loginEmailFirebase, forgotPasswordFirebase } from './firebase/Auth';
import { RESET_PASSWORD } from '../config/constants';
import { formatEmail } from '../config/helper';
import { checkValidityForSignIn, redirectSignIn } from './firebase/Helper';
import { loaderToggle } from './LoaderAction';
import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-simple-toast';

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const REQUEST_FORGOT = 'REQUEST_FORGOT';
export const RECEIVE_FORGOT = 'RECEIVE_FORGOT';

/**
 * action creator for request auth
 * @return {Object} action for REQUEST_AUTH
 */
export function requestAuth() {
    return {
        type: REQUEST_AUTH
    };
}

/**
 * action creator for recieve auth
 * @param json request fetched
 * @return {Object} action for RECEIVE_AUTH
 */
export function receiveAuth(json) {
    return {
        type: RECEIVE_AUTH,
        user: json
    };
}

/**
 * action creator when recieved error during auth
 * @param json error request fetched
 * @return {Object} action for RECEIVE_ERROR
 */
export function receiveError(json) {
    return {
        type: RECEIVE_ERROR,
        error: json
    };
}

/**
 * action creator to forgot request
 * @return {Object} action for REQUEST_FORGOT
 */
export function requestForgot() {
    return {
        type: REQUEST_FORGOT
    };
}

/**
 * action creator to handle forgot password
 * @param message
 * @return {Object} action for RECEIVE_FORGOT
 */
export function receiveForgot(message) {
    return {
        type: RECEIVE_FORGOT,
        message
    };
}

/**
 * login user in to app by using firebase
 * @param email useremail
 * @param password userpassword
 * @return login the user
 */
export function login(email, password) {
    return (dispatch, getState) => {
        dispatch(loaderToggle());
        checkValidityForSignIn(email, 'email')
            .then(result => {
                dispatch(requestAuth());
                loginEmailFirebase(email, password)
                    .then(user => {
                        if (firebase.auth().currentUser.emailVerified) {
                            dispatch(requestAuth());
                            dispatch(loaderToggle());
                            dispatch(receiveAuth(user));
                            Actions.main({ type: ActionConst.REPLACE });
                        } else {
                            dispatch(requestAuth());
                            dispatch(loaderToggle());
                            Toast.show('Please verify your email');
                        }
                    })
                    .catch(error => {
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
    };
}

/**
 * register the user using firebase in database
 * @param name username
 * @param email useremail
 * @param password userpassword
 * @return register the user
 */
export function register(name, email, password) {
    return (dispatch, getState) => {
        dispatch(loaderToggle());
        checkValidityForSignIn(email, 'email')
            .then(result => {
                dispatch(requestAuth());
                registerFirebase(name, email, password)
                    .then(user => {
                        firebase.auth().currentUser.sendEmailVerification();
                        dispatch(loaderToggle());
                        Actions.home({ type: ActionConst.REPLACE });
                        Toast.show('Verification Email has been sent');
                    })
                    .catch(error => {
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
    };
}

/**
 * getting auth details
 * @return recieving user auth
 */
export function initApp() {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        initFirebase()
            .then(user => {
                dispatch(receiveAuth(user));
            })
            .catch(() => {
                dispatch(receiveAuth(null));
            });
    };
}

/**
 * forgot password action using firebase function
 * @param email user registered Email id
 * @return password reset
 */
export function forgotPassword(email) {
    return dispatch => {
        dispatch(requestForgot());
        forgotPasswordFirebase(email)
            .then(() => dispatch(receiveForgot(RESET_PASSWORD)))
            .catch(error => dispatch(receiveForgot(error.message)));
    };
}

/**
 * update action using firebase function
 * @return updates the user firebase
 */

export function updateUserFirebase(user) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const email = firebase.auth().currentUser.email;
            firebase
                .database()
                .ref('users/' + formatEmail(email))
                .update(user);
            dispatch(receiveAuth(user));
            resolve();
        }).catch(err => {
            crashlytics().log('Error while updating user data' + err.message);
        });
    };
}

/**
 * logout action using firebase function
 * @return logout the user
 */
export function logout() {
    return dispatch => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                Actions.intro({ type: ActionConst.RESET });
                // Reset the store
                dispatch({
                    type: 'USER_LOGOUT'
                });
            })
            .catch(error => {
                crashlytics().recordError(error);
            });
    };
}
