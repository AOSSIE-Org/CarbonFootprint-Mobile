import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import { getUser } from './User';
import Toast from 'react-native-simple-toast';
import { formatEmail } from '../../config/helper';

/**
 * 0 - Request accepted (Friends)
 * 1 - Request sent by you but not accepted
 * 2 - Request received but not accepted
 * @param   currentEmail unique id or user id given to user logged in
 * @param   friendEmail  unique id or user id of friend
 * @return {promise}
 */
export function sendFriendRequest(currentEmail, friendEmail) {
    return new Promise(function(resolve, reject) {
        if (currentEmail === friendEmail) {
            Toast.show('You can not send friend request to yourself');
            reject('You can not send friend request to yourself');
        } else {
            currentEmail = formatEmail(currentEmail);
            friendEmail = formatEmail(friendEmail);
            const databaseRef = firebase
                .database()
                .ref('users/' + currentEmail + '/friends/' + friendEmail);
            databaseRef.once('value').then(function(snapshot) {
                const currentState = snapshot.val();
                if (currentState == 0) {
                    Toast.show('You have already added this user as your friend.');
                    reject('You have already added this user as your friend.');
                } else if (currentState == 1) {
                    Toast.show('You have already sent a friend request to this user.');
                    reject('You have already sent a friend request to this user.');
                } else if (currentState == 2) {
                    Toast.show('This user has already sent you a request.');
                    reject('This user has already sent you a request.');
                } else {
                    databaseRef
                        .set(1)
                        .then(() => {
                            firebase
                                .database()
                                .ref('users/' + friendEmail + '/friends/' + currentEmail)
                                .set(2)
                                .then(() => {
                                    getUser(currentEmail)
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
 * @param  currentEmail unique id or user id given to user logged in
 * @param  friendEmail  unique id or user id of friend
 * @return {Promise}
 */
export function acceptFriendRequest(currentEmail, friendEmail) {
    currentEmail = formatEmail(currentEmail);
    friendEmail = formatEmail(friendEmail);
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref('users/' + currentEmail + '/friends/' + friendEmail)
            .set(0)
            .then(() => {
                firebase
                    .database()
                    .ref('users/' + friendEmail + '/friends/' + currentEmail)
                    .set(0)
                    .then(() => {
                        getUser(currentEmail)
                            .then(user => {
                                resolve(user);
                                Toast.show('Friend request accepted');
                            })
                            .catch(error => {
                                reject(error);
                                alert('Friends.js (acceptFriendRequest 1): ' + error);
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
 * Delete Friend Request or Already Added Friend
 * @param  currentEmail unique id or user id given to user logged in
 * @param  friendEmail  unique id or user id of friend
 * @return {Promise}
 */
export function deleteFriend(currentEmail, friendEmail) {
    currentEmail = formatEmail(currentEmail);
    friendEmail = formatEmail(friendEmail);
    return new Promise(function(resolve, reject) {
        firebase
            .database()
            .ref('users/' + currentEmail + '/friends/' + friendEmail)
            .remove()
            .then(() => {
                firebase
                    .database()
                    .ref('users/' + friendEmail + '/friends/' + currentEmail)
                    .remove()
                    .then(() => {
                        getUser(currentEmail)
                            .then(user => {
                                resolve(user);
                            })
                            .catch(error => {
                                reject(error);
                                Toast.show('An error was encountered. Please try again later.');
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
            .on('value', function(snapshot) {
                if (snapshot.val()) {
                    snapshot.forEach(function(data) {
                        let user = [
                            {
                                name: data.val().name,
                                picture: data.val().picture,
                                email: data.val().email
                            }
                        ];
                        resolve(user);
                    });
                } else reject('No user found');
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
            .on('value', function(snapshot) {
                if (snapshot.val()) {
                    snapshot.forEach(function(data) {
                        // this will have all the users.
                        users.push({
                            name: data.val().name,
                            picture: data.val().picture,
                            email: data.val().email
                        });
                        resolve(users);
                    });
                } else {
                    reject('No user found');
                }
            });
    });
}
