import * as firebase from "firebase";
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';
import { firebaseConfig } from '../config/keys';

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
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(receiveAuth(user));
            Actions.landing({type: ActionConst.RESET});
            Actions.main();
        })
        .catch((error) => {
            dispatch(receiveError(error));
        })
    }
}

export function register(email, password) {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(receiveAuth(user));
            Actions.landing({type: ActionConst.RESET});
            Actions.main();
        })
        .catch((error) => {
            dispatch(receiveError(error));
        })
    }
}

export function getUser() {
    return (dispatch, getState) => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        dispatch(requestAuth());
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(receiveAuth(user));
            } else {
                dispatch(receiveAuth(null));
            }
        });
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
            Actions.main({type: ActionConst.RESET});
            Actions.landing();
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
