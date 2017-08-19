import {
    getMultiple
} from './firebase/Helper';

export const REQUEST_FRIENDS = "REQUEST_FRIENDS";
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

function requestFriends() {
    return {
        type: REQUEST_FRIENDS,
    }
}

function receiveFriends(list) {
    return {
        type: RECEIVE_FRIENDS,
        list
    }
}

function receiveError(error) {
    return {
        type: RECEIVE_ERROR,
        error
    }
}

export function getFriendList() {
    return (dispatch, getState) => {
        dispatch(requestFriends());
        const friends = getState().auth.user.friends;
        if (friends === undefined) {
            dispatch(receiveFriends({}));
        } else {
            getMultiple(Object.keys(friends))
            .then((friends) => {
                console.log(friends);
                dispatch(receiveFriends(friends));
            })
        }
    }
}
