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

export function getFriendList(choice) {
    return (dispatch, getState) => {
        dispatch(requestFriends());
        var friends = {}; 
        const obj = getState().auth.user.friends;
        for(var key in obj) {
          if(obj.hasOwnProperty(key)) {
            if(choice === "1" && obj[key] === 0)
                friends[key] = true;
            if(choice === "2" && obj[key] === 2)
                friends[key] = false;
          }
        }
        if (friends === undefined) {
            dispatch(receiveFriends({}));
        } else {
            getMultiple(Object.keys(friends))
            .then((friends) => {
                dispatch(receiveFriends(friends));
            })
        }
    }
}
