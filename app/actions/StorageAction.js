import { AsyncStorage } from 'react-native';

export const REQUEST_STORAGE = "REQUEST_STORAGE";
export const RECEIVE_STORAGE = "RECEIVE_STORAGE";

function request_storage() {
    return {
        type: REQUEST_STORAGE
    }
}

function receive_storage(token) {
    return {
        type: RECEIVE_STORAGE,
        token: token
    }
}

export function getStorage() {
    return(dispatch, state) => {
        dispatch(request_storage());
        AsyncStorage.getItem('token')
            .then(value => {
                dispatch(receive_storage(value))
            })
            .catch(err => {
                dispatch(receive_storage(null))
            })
    }
}
