import * as firebase from 'firebase';

import {
    getMultiple
} from 'Helper';

export function sendFriendRequest(uid) {
}

export function searchFriends(email) {
}

export function getFriends(list) {
    return new Promise(function(resolve, reject) {
        getMultiple(list)
        .then((user) => {
            resolve(user);
        })
        .catch((error) => {
            console.log(error);
        })
    });
}
