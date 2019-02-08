import * as firebase from 'firebase';
import { getUser } from './User';
import Toast from 'react-native-simple-toast';

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
            Toast.show('You can not send friend request to yourself');
            reject('You can not send friend request to yourself');
        } else {
            const databaseRef = firebase
                .database()
                .ref('users/' + currentUid + '/friends/' + friendUid);
            databaseRef
            .once('value')
            .then(function(snapshot) {
                const currentState = snapshot.val();
                if (currentState == 0) {
                    Toast.show('You have already added this user as your friend.');
                    reject('You have already added this user as your friend.');
                }
                else if (currentState == 1) {
                    Toast.show('You have already sent a friend request to this user.');
                    reject('You have already sent a friend request to this user.');
                }
                else if (currentState == 2) {
                    Toast.show('This user has already sent you a request.');
                    reject('This user has already sent you a request.');
                }
                else {
                    databaseRef
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
                                            Toast.show('Friend request sent');
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
                                Toast.show('Friend request accepted');
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
 * Delete Friend Request
 * @param  currentUid unique id or user id given to user logged in
 * @param  friendUid  unique id or user id of friend
 * @return {Promise}
 */
export function deleteFriendRequest(currentUid, friendUid) {
    return new Promise(function(resolve, reject){
        firebase
        .database()
        .ref('users/' + currentUid + '/friends/' + friendUid)
        .remove()
        .then(() => {
            firebase
            .database()
            .ref('users/' + friendUid + '/friends/' + currentUid)
            .remove()
            .then(() => {
                getUser(currentUid)
                .then(user => {
                    resolve(user);
                    Toast.show('Friend Request deleted.');
                })
                .catch(error =>{
                    reject(error);
                    Toast.show('An error was encountered. Please try again later.')
                });
            });
        });
    });
}

/**
 * Search Friends Via email
 * @param  value email user searched for
 * @return {Promise} snapshot of user with that email
 */
export function searchFriendsByEmail(value) {
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref('users/')
            .orderByChild('email')
            .equalTo(value)
            .on('child_added', function(snapshot) {
                var user = [
                    {
                        uid: snapshot.key,
                        name: snapshot.val().name,
                        picture: snapshot.val().picture,
                        email: snapshot.val().email
                    }
                ];
                resolve(user);
            });
    });
}
/**
 * function to search friends by their name
 * @param  value username user searched for
 * @return {Promise} snapshot of list of users with that username
 */
export function searchFriendsByUserName(value) {
    return new Promise(function(resolve, reject) {
        let users = [];
        firebase
            .database()
            .ref('users/')
            .orderByChild('name')
            .equalTo(value)
            .on('child_added', function(snapshot) {
                // this will have all the users.
                users.push({
                    uid: snapshot.key,
                    name: snapshot.val().name,
                    picture: snapshot.val().picture,
                    email: snapshot.val().email
                });
                resolve(users);
            });
    });
}

