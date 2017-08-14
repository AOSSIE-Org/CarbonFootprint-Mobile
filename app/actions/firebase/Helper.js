/*
 * Check this out.
 * https://stackoverflow.com/questions/42610264/querying-by-multiple-keys-in-firebase
 */

import * as firebase from 'firebase';

export function getMultiple(keys) {
    return new Promise(function(resolve, reject) {
        var promises = keys.map(function(key) {
            return firebase.database().ref('/users/').child(key).once("value");
        });
        Promises.all(promises).then(function(snapshots) {
            var users = {};
            snapshots.forEach(function(snapshot) {
                users.snapshot.key = snapshot.val();
            });
            resolve(users);
        })
    });
}
