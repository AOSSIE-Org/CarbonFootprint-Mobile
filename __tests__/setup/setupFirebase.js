import firebase from 'react-native-firebase';

import * as admin from 'firebase-admin';
import { firebaseConfigForTesting } from '../../app/config/keys';

// Initialising clientSDK
export function initFirebase() {
    let FirebaseServer = require('firebase-server');
    new FirebaseServer(5000, 'localhost', {});
    firebase.initializeApp(firebaseConfigForTesting);
}

// Initialising adminSDK
export function initAdmin() {
    let serviceAccount = require('../../android/app/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: firebaseConfigForTesting.databaseURL
    });
}

// Wipes out the entire database and also the authenticated users data

export const wipeDatabase = async () => {
    //List batch of users, 20 at a time.
    await admin
        .auth()
        .listUsers(20)
        .then(function(listUsersResult) {
            listUsersResult.users.forEach(async function(userRecord) {
                await admin
                    .auth()
                    .deleteUser(userRecord.uid)
                    .then(function() {
                        console.log('Successfully deleted user');
                    })
                    .catch(function(error) {
                        console.log('Error deleting user:', error);
                    });
            });
        })
        .catch(function(error) {
            console.log('Error listing users:', error);
        });
    await admin
        .database()
        .ref()
        .remove();
};
