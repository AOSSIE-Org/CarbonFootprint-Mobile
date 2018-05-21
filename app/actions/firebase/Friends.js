import * as firebase from 'firebase';
import { getUser } from './User';

/**
 * 0 - Request accepted (Friends)
 * 1 - Request sent by you but not accepted
 * 2 - Request received but not accepted ]
 * @param   currentUid unique id or user id given to user logged in
 * @param   friendUid  unique id or user id of friend
 * @return {promise}
 */
export function sendFriendRequest(currentUid, friendUid) {
    return new Promise(function(resolve, reject) {
        if (currentUid === friendUid) {
            alert('You can not send friend request to yourself');
            reject('You can not send friend request to yourself');
        } else {
            firebase
                .database()
                .ref('users/' + currentUid + '/friends/' + friendUid)
                .set(1)
                .then(() => {
                    firebase
                        .database()
                        .ref('users/' + friendUid + '/friends/' + currentUid)
                        .set(2)
                        .then(() => {
                            getUser(currentUid)
                                .then(user => {
                                    resolve(user);
                                    alert('Friend request sent');
                                })
                                .catch(error => {
                                    reject(error);
                                    alert(error);
                                });
                        })
                        .catch(error => {
                            reject(error);
                            alert(error);
                        });
                })
                .catch(error => {
                    reject(error);
                    alert(error);
                });
        }
    });
}

/**
 *
 * @param  currentUid unique id or user id given to user logged in
 * @param  friendUid  unique id or user id of friend
 * @return {Promise}
 */
export function acceptFriendRequest(currentUid, friendUid) {
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref('users/' + currentUid + '/friends/' + friendUid)
            .set(0)
            .then(() => {
                firebase
                    .database()
                    .ref('users/' + friendUid + '/friends/' + currentUid)
                    .set(0)
                    .then(() => {
                        getUser(currentUid)
                            .then(user => {
                                resolve(user);
                                alert('Friend request accepted');
                            })
                            .catch(error => {
                                reject(error);
                                alert(
                                    'Friends.js (acceptFriendRequest 1): ' +
                                        error
                                );
                            });
                    })
                    .catch(error => {
                        reject(error);
                        alert('Friends.js (acceptFriendRequest 2): ' + error);
                    });
            })
            .catch(error => {
                reject(error);
                alert('Friends.js (acceptFriendRequest 3): ' + error);
            });
    });
}

/**
 * Search Friends Via email
 * @param  value email of friend
 * @return {Promise}
 */
export function searchFriends(value) {
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref('users/')
            .orderByChild('email')
            .equalTo(value)
            .on('child_added', function(snapshot) {
                // this will have all the users.
                resolve(snapshot);
            });
    });
}
