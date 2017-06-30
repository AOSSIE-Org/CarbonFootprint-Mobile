/*
    This is for dispatching actions before (request_storage) and after (receive_storage) getting user's email.
    Also it is used for storing user's email into Local storage and fetching user's email from Local storage.
*/

import { AsyncStorage } from 'react-native';

export const REQUEST_STORAGE = "REQUEST_STORAGE";
export const RECEIVE_STORAGE = "RECEIVE_STORAGE";

// Action before getting user's email  
function request_storage() {
    return {
        type: REQUEST_STORAGE
    }
}

// Action after getting user's email
function receive_storage(email) {
    return {
        type: RECEIVE_STORAGE,
        email: email
    }
}

// Action to fetch user's email from Local storage and dispatch other actions
export function getStorage() {
    return(dispatch, state) => {

        // Dispatching 'request_storage' action
        dispatch(request_storage());

        // Fetching user's email from Local storage
        AsyncStorage.getItem('email')
            .then(value => {

                // Dispatching 'receive_storage' action
                dispatch(receive_storage(value))
            })
            .catch(err => {
                dispatch(receive_storage(null))
            })
    }
}

// Action to store user's email into Local storage and dispatch other actions
export function setStorage(value) {
    return (dispatch, state) => {

        // Dispatching 'receive_storage' action
        dispatch(receive_storage(value));

        // Storing user's email into Local storage
        AsyncStorage.setItem('email', value)
            .catch(err => {
                console.log("Error while setting")
            })
    }
}
