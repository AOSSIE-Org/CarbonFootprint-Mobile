import * as firebase from 'firebase';

export function sendFriendRequest(uid) {
    return (dispatch, getState) => {
        console.log("Making Friends with: ", uid);
    }
}

export function searchFriends(email) {
    return (dispatch, getState) => {
        console.log("Searching Friends");
    }
}
