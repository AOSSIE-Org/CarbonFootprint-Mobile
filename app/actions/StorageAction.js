/*
 * Handles SET and GET Operations on AsyncStorage
*/

import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export const REQUEST_STORAGE = "REQUEST_STORAGE";
export const RECEIVE_STORAGE = "RECEIVE_STORAGE";

function request_storage() {
    return {
        type: REQUEST_STORAGE
    }
}

function receive_storage(email) {
    return {
        type: RECEIVE_STORAGE,
        email: email
    }
}

export function getStorage() {
    return(dispatch, state) => {
        dispatch(request_storage());
        AsyncStorage.getItem('email')
            .then(value => {
                dispatch(receive_storage(value))
            })
            .catch(err => {
                dispatch(receive_storage(null))
            })
    }
}

export function setStorage(value) {
    return (dispatch, state) => {
        dispatch(receive_storage(value));
        AsyncStorage.setItem('email', value)
            .catch(err => {
                alert("Error while setting")
            })
    }
}

export function removeStorage() {
    return (dispatch, state) => {
        AsyncStorage.removeItem('email')
            .catch(err => {
                alert("Error while removing")
            })
        // Reset store
        dispatch({
            type: "USER_LOGOUT"
        });
        // Move to login form
        Actions.landing({type: ActionConst.RESET});
    }
}
