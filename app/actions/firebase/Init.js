import * as firebase from 'firebase';
import { firebaseConfig } from '../../config/keys';

import { getUser } from './User';

/**
 * Firebase initialization
 */
export function initFirebase() {
    return new Promise(function(resolve, reject) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                getUser(user.email)
                    .then(user => {
                        resolve(user);
                    })
                    .catch(error => reject());
            } else {
                reject();
            }
        });
    });
}
