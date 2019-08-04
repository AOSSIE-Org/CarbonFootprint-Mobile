import firebase from 'react-native-firebase';
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
        const serverTime = firebase.database().getServerTime();
        console.log(serverTime, 'ServerTime');
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user = user.toJSON();
                getUser(user.email)
                    .then(user => resolve(user))
                    .catch(error => reject());
            } else {
                reject();
            }
        });
    });
}
