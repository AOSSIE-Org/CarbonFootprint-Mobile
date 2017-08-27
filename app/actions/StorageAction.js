/*
 * Handles SET and GET Operations on AsyncStorage
 * Used for User Preferences in Settings.
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

function receive_storage(data) {
    return {
        type: RECEIVE_STORAGE,
        data
    }
}

export function getStorage() {
    return(dispatch, state) => {
        dispatch(request_storage());
        AsyncStorage.getItem('data')
            .then(data => {
                console.log(data);
                dispatch(receive_storage(JSON.parse(data)))
            })
            .catch(err => {
                // Do nothing, let it take the default values.
                console.log(err);
            })
    }
}

export function setStorage(data) {
    return (dispatch, state) => {
        dispatch(receive_storage(data));
        console.log(data);
        AsyncStorage.setItem('data', JSON.stringify(data))
            .catch(err => {
                alert("Error while setting")
            })
    }
}

/* This is an overkill function, should be called only if user wants to
   delete his/her profile which we don't provide an option.....Evil!!!!!!
 */
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
