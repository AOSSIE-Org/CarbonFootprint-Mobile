import * as firebase from "firebase";
import { Actions, ActionConst } from 'react-native-router-flux';
import { setStorage } from './StorageAction';
import { firebaseConfig } from '../config/keys';

export const REQUEST_AUTH = "REQUEST_AUTH";
export const RECEIVE_AUTH = "RECEIVE_AUTH";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

export function request_auth() {
    return {
        type: REQUEST_AUTH,
    }
}

export function receive_auth(json) {
    return {
        type: RECEIVE_AUTH,
        user: json
    }
}

export function receive_error(json) {
    return {
        type: RECEIVE_ERROR,
        error: json,
    }
}

export function login(email, password) {
    return (dispatch, getState) => {
        dispatch(request_auth());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(receive_auth(user));
            Actions.landing({type: ActionConst.RESET});
            Actions.main();
        })
        .catch((error) => {
            dispatch(receive_error(error.message));
        })
    }
}

export function register(email, password) {
    return (dispatch, getState) => {
        dispatch(request_auth());
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(receive_auth(user));
            Actions.landing({type: ActionConst.RESET});
            Actions.main();
        })
        .catch((error) => {
            dispatch(receive_error(error.message));
        })
    }
}

export function getUser() {
    return (dispatch, getState) => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        dispatch(request_auth());
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(receive_auth(user));
            } else {
                dispatch(receive_auth(null));
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
