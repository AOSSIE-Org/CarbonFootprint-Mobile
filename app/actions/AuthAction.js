import * as firebase from "firebase";
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';
import { firebaseConfig } from '../config/keys';

import { initFirebase } from './firebase/Init';
import {
    registerFirebase,
    loginEmailFirebase,
    forgotPasswordFirebase,
} from './firebase/Auth';

export const REQUEST_AUTH = "REQUEST_AUTH";
export const RECEIVE_AUTH = "RECEIVE_AUTH";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const REQUEST_FORGOT = "REQUEST_FORGOT";
export const RECEIVE_FORGOT = "RECEIVE_FORGOT";

export function requestAuth() {
    return {
        type: REQUEST_AUTH,
    }
}

export function receiveAuth(json) {
    return {
        type: RECEIVE_AUTH,
        user: json
    }
}

export function receiveError(json) {
    return {
        type: RECEIVE_ERROR,
        error: json,
    }
}

export function requestForgot() {
    return {
        type: REQUEST_FORGOT
    }
}

export function receiveForgot(message) {
    return {
        type: RECEIVE_FORGOT,
        message
    }
}

export function login(email, password) {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        loginEmailFirebase(email, password)
        .then((user) => {
            dispatch(receiveAuth(user));
            Actions.main({type: ActionConst.RESET});
        })
        .catch((error) => {
            dispatch(receiveError(error));
        })
    }
}

export function register(name, email, password) {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        registerFirebase(name, email, password)
        .then((user) => {
            dispatch(receiveAuth(user));
            Actions.main({type: ActionConst.RESET});
        })
        .catch((error) => {
            dispatch(receiveError(error));
        })
    }
}

export function initApp() {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        initFirebase()
        .then((user) => {
            dispatch(receiveAuth(user));
        })
        .catch(() => {
            dispatch(receiveAuth(null));
        })
    }
}

export function forgotPassword(email) {
    return (dispatch) => {
        dispatch(requestForgot());
        forgotPasswordFirebase(email)
        .then(() => dispatch(receiveForgot("Password reset link has been sent to your email")))
        .catch((error) => dispatch(receiveForgot(error.message)))
    }
}

export function logout() {
    return (dispatch) => {
        firebase.auth().signOut()
        .then(() => {
            // Reset the store
            dispatch({
                type: "USER_LOGOUT"
            });
            Actions.landing({type: ActionConst.RESET});
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
