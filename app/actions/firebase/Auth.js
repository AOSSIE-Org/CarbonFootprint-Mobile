import * as firebase from 'firebase';
import {
    setUser,
    getUser
} from './User';

export function registerFirebase(name, email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            let temp = {
                name,
                email,
                picture: null,
                provider: 'email',
            }
            setUser(user.uid, temp)
            .then(() => {
                getUser(user.uid)
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    })
}

export function loginEmailFirebase(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            getUser(user.uid)
            .then((user) => resolve(user))
            .catch((error) => reject(user))
        })
        .catch((error) => reject(error))
    })
}

export function loginCustomFirebase(type, token, secret) {
    return new Promise((resolve, reject) => {
        let credential = null;
        let provider = null;
        switch(type) {
            case "facebook":
                credential = firebase.auth.FacebookAuthProvider.credential(token);
                provider = 'facebook.com';
                break;
            case "google":
                credential = firebase.auth.GoogleAuthProvider.credential(token, secret);
                provider = 'google.com';
                break;
            default:
                // Default is Twitter
                credential = firebase.auth.TwitterAuthProvider.credential(token, secret);
                provider = 'twitter.com'
                break;
        }
        firebase.auth().signInWithCredential(credential)
        .then((user) => {
            getUser(user.uid)
            .then((user) => resolve(user))
            .catch((error) => {
                let temp = {
                    name: user.displayName,
                    email: user.email || null,
                    picture: user.photoURL || null,
                    provider: provider
                }
                setUser(user.uid, temp)
                .then(() => {
                    getUser(user.uid)
                    .then((user) => resolve(user))
                    .catch((error) => reject(error))
                })
                .catch((error) => reject(error))
            })
        })
        .catch((error) => {
            reject(error)
        })
    })
}
