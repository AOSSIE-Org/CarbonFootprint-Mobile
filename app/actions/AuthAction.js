import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';
import { firebaseConfig } from '../config/keys';
import { initFirebase } from './firebase/Init';
import {
    registerFirebase,
    loginEmailFirebase,
    forgotPasswordFirebase
} from './firebase/Auth';
import { RESET_PASSWORD } from '../config/constants';

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const REQUEST_FORGOT = 'REQUEST_FORGOT';
export const RECEIVE_FORGOT = 'RECEIVE_FORGOT';
export const ADD_USER_FIREBASE = 'ADD_USER_FIREBASE';

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
 * action creator to handle update of user details
 * @param userDetails
 * @return {Object} action for ADD_USER_FIREBASE
 */

export function addUserDetails(userDetails) {
    return {
        type: ADD_USER_FIREBASE,
        user: userDetails
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
        dispatch(requestAuth());
        loginEmailFirebase(email, password)
            .then(user => {
                dispatch(receiveAuth(user));
                Actions.main({ type: ActionConst.RESET });
            })
            .catch(error => {
                dispatch(receiveError(error));
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
        dispatch(requestAuth());
        registerFirebase(name, email, password)
            .then(user => {
                dispatch(receiveAuth(user));
                Actions.main({ type: ActionConst.RESET });
            })
            .catch(error => {
                dispatch(receiveError(error));
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

export function updateUserFirebase(user) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const uid = firebase.auth().currentUser.uid;
            firebase
                .database()
                .ref('users/' + uid)
                .update(user);
            dispatch(addUserDetails(user));
            resolve();
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
                Actions.landing({ type: ActionConst.RESET });
                // Reset the store
                dispatch({
                    type: 'USER_LOGOUT'
                });
            })
            .catch(error => {
                //console.log(error);
            });
    };
}
