/*
 * Handles SET and GET Operations on AsyncStorage
 * Used for User Preferences in Settings.
 */

import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export const REQUEST_STORAGE = 'REQUEST_STORAGE';
export const RECEIVE_STORAGE = 'RECEIVE_STORAGE';

/**
 * action creator to request storage
 * @return {Object} action for REQUEST_STORAGE
 */
function request_storage() {
    return {
        type: REQUEST_STORAGE
    };
}

/**
 * action creator to recieve Storage by passing data
 * @param data
 * @return {Object} action for RECEIVE_STORAGE
 */
function receive_storage(data) {
    return {
        type: RECEIVE_STORAGE,
        data
    };
}

/**
 * Fetches an item for a key and invokes a callback upon completion. Returns a Promise object
 */
export function getStorage() {
    return (dispatch, getState) => {
        dispatch(request_storage());
        AsyncStorage.getItem('data')
            .then(data => {
                if (data !== null) dispatch(receive_storage(JSON.parse(data)));
                else dispatch(receive_storage(getState().storage.data));
            })
            .catch(err => {
                // Do nothing, let it take the default values.
                //console.log(err);
            });
    };
}

/**
 * Sets the value for a data and invokes a callback upon completion. Returns a Promise object.
 * @param string data
 * @return function handling storage items
 */
export function setStorage(data) {
    return (dispatch, state) => {
        dispatch(receive_storage(data));
        //console.log(data);
        AsyncStorage.setItem('data', JSON.stringify(data)).catch(err => {
            alert('Error while setting');
        });
    };
}

/**
 * Removes an item for a key and invokes a callback upon completion. Returns a Promise object.
 * @return function handling removing items from storage
 */
export function removeStorage() {
    return (dispatch, state) => {
        AsyncStorage.removeItem('email').catch(err => {
            alert('Error while removing');
        });
        // Reset store
        dispatch({
            type: 'USER_LOGOUT'
        });
        // Move to login form
        Actions.landing({ type: ActionConst.RESET });
    };
}
