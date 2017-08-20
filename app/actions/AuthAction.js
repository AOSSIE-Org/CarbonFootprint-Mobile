import * as firebase from "firebase";
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';
import { firebaseConfig } from '../config/keys';

import { initFirebase } from './firebase/Init';
import {
    registerFirebase,
    loginEmailFirebase
} from './firebase/Auth';

export const REQUEST_AUTH = "REQUEST_AUTH";
export const RECEIVE_AUTH = "RECEIVE_AUTH";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

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
