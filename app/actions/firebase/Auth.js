import * as firebase from 'firebase';
import { setUser, getUser, updateUser } from './User';

/**
 * firebase function to register user
 * @param {string} name username
 * @param {string} email useremail
 * @param {string} password user password
 * @return {promise}
 */
export function registerFirebase(name, email, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                let temp = {
                    name,
                    email,
                    picture: null,
                    provider: 'email'
                };
                setUser(firebase.auth().currentUser.uid, temp)
                    .then(() => {
                        getUser(firebase.auth().currentUser.uid)
                            .then(user => {
                                resolve(user);
                            })
                            .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}
/**
 * firebase function to login user
 * @param {string} email
 * @param {password} password
 * @return {Promise}
 */
export function loginEmailFirebase(email, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        getUser(user.uid)
                            .then(user => resolve(user))
                            .catch(error => reject());
                    } else {
                        reject();
                    }
                });
            })
            .catch(error => reject(error));
    });
}

/**
 *
 * @param {string} type service used by user to login
 * @param {string} token from SERVICE API
 * @param {string} secret from SERVICE API
 * @return {Promise}
 */
export function loginCustomFirebase(type, token, secret) {
    return new Promise((resolve, reject) => {
        let credential = null;
        let provider = null;
        switch (type) {
            case 'facebook':
                // Facebook doesn't need a secret, rest all do.
                credential = firebase.auth.FacebookAuthProvider.credential(
                    token
                );
                provider = 'facebook.com';
                break;
            case 'google':
                credential = firebase.auth.GoogleAuthProvider.credential(
                    token,
                    secret
                );
                provider = 'google.com';
                break;
            default:
                // Default is Twitter
                credential = firebase.auth.TwitterAuthProvider.credential(
                    token,
                    secret
                );
                provider = 'twitter.com';
                break;
        }
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(user => {
                getUser(user.uid)
                    .then(() => {
                        let temp = {
                            name: user.displayName,
                            email: user.email || null,
                            picture: user.photoURL || null,
                            provider: provider
                        };

                        updateUser(user.uid, temp)
                            .then(() => resolve())
                            .catch(error => reject(error));
                        resolve(user);
                    })
                    .catch(error => {
                        let temp = {
                            name: user.displayName,
                            email: user.email || null,
                            picture: user.photoURL || null,
                            provider: provider
                        };
                        setUser(user.uid, temp)
                            .then(() => {
                                getUser(user.uid)
                                    .then(user => resolve(user))
                                    .catch(error => reject(error));
                            })
                            .catch(error => reject(error));
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * firebase function to recover password by sending mail to user registered email
 * @param {string} email
 * @return {Promise}
 */
export function forgotPasswordFirebase(email) {
    return new Promise(function(resolve, reject) {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}
