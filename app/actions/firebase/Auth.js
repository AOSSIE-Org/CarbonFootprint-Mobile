import auth from '@react-native-firebase/auth';
import { setUser, getUser } from './User';
import { urlToBase64 } from '../../config/helper';

/**
 * firebase function to register user
 * @param {string} name username
 * @param {string} email useremail
 * @param {string} password user password
 * @return {promise}
 */
export function registerFirebase(name, email, password) {
    return new Promise((resolve, reject) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                let temp = {
                    name,
                    email,
                    picture: null,
                    provider: 'email'
                };
                setUser(auth().currentUser.email, temp)
                    .then(() => {
                        getUser(auth().currentUser.email)
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
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                auth().onAuthStateChanged(function(user) {
                    if (user) {
                        user = user.toJSON();
                        getUser(user.email)
                            .then(user => resolve(user))
                            .catch(error => reject(error));
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
                credential = auth.FacebookAuthProvider.credential(token);
                provider = 'facebook.com';
                break;
            default:
                //default is google
                credential = auth.GoogleAuthProvider.credential(token, secret);
                provider = 'google.com';
                break;
        }
        auth()
            .signInWithCredential(credential)
            .then(user => {
                user = user.user.toJSON();
                getUser(user.email)
                    .then(user => {
                        urlToBase64(user).then(user => {
                            resolve(user);
                        });
                    })
                    .catch(error => {
                        let userData = {
                            name: user.displayName,
                            email: user.email || null,
                            picture: user.photoURL || null,
                            provider: provider
                        };
                        urlToBase64(userData).then(userData => {
                            setUser(userData.email, userData)
                                .then(() => {
                                    getUser(userData.email)
                                        .then(user => resolve(user))
                                        .catch(error => reject(error));
                                })
                                .catch(error => reject(error));
                        });
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
        auth()
            .sendPasswordResetEmail(email)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}
