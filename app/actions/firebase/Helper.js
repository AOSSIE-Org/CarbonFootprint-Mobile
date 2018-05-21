/*
 * Thanks to this stackoverflow question.
 * https://stackoverflow.com/questions/42610264/querying-by-multiple-keys-in-firebase
 */

import * as firebase from 'firebase';

/**
 * querying using multiple keys in firebase
 * @param keys
 * @return {Promise}
 */
export function getMultiple(keys) {
    return new Promise(function(resolve, reject) {
        var promises = keys.map(function(key) {
            return firebase
                .database()
                .ref('/users/')
                .child(key)
                .once('value');
        });
        Promise.all(promises).then(function(snapshots) {
            var users = [];
            snapshots.forEach(function(snapshot) {
                let key = snapshot.key;
                let value = snapshot.val();
                let user = {};
                user = { ...value, uid: key };
                users.push(user);
            });
            resolve(users);
        });
    });
}
