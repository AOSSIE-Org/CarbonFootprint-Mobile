import * as firebase from 'firebase';
import {
    getUser
} from './User';

export function sendFriendRequest(currentUid, friendUid) {
    return new Promise(function(resolve, reject) {
        firebase.database().ref('users/' + currentUid + '/friends')
        .child(friendUid).setValue(false)
        .then(() => {
            firebase.database().ref('users/' + friendUid + '/friends')
            .child(currentUid).setValue(false)
            .then(() => {
                getUser(currentUid)
                .then((user) => {
                    resolve(error);
                })
                .catch((error) => {
                    reject(error);
                })
            })
            .catch((error) => {
                reject(error);
            })
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export function acceptFriendRequest(currentUid, friendUid) {
    return new Promise(function(resolve, reject) {
        firebase.database().ref('users/' + currentUid + '/friends')
        .child(friendUid).setValue(true)
        .then(() => {
            firebase.database().ref('users/' + friendUid + '/friends')
            .child(currentUid).setValue(true)
            .then(() => {
                getUser(currentUid)
                .then((user) => resolve(user))
                .catch((error) => reject(error))
            })
            .catch((error) => reject(error))
        })
        .catch((error) => reject(error))
    });
}

/* Search Friends Via email */

export function searchFriends(value) {
    return new Promise(function(resolve, reject) {
        firebase.database().ref('users/').orderByChild('email').equalTo(value)
        .on('child_added', function(snapshot) {
            // this will have all the users.
        });
    });
}
