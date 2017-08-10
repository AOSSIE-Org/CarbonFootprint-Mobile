import * as firebase from 'firebase';

export function setUser(uid, data) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + uid).set({
            ...data
        })
        .then(() => resolve())
        .catch((error) => reject(error))
    })
}

export function getUser(uid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + uid).once('value')
        .then(function(snapshot) {
            if (snapshot.val() !== null) {
                resolve({
                    ...snapshot.val(),
                    uid: uid
                });
            } else {
                reject();
            }
        })
        .catch((error) => {
            reject(error);
        });
    })
}
