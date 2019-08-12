import firebase from 'react-native-firebase';
import { formatEmail } from '../../config/helper';

/**
 *update user details in database
 * @param  email email of logged in user
 * @param  data co2 emitted by user from all sources
 * @return {Promise}
 */
export function setUser(email, data) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('users/' + formatEmail(email))
            .set(data)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}

/**
 * getting user details from email
 * @param  email email of logged in user
 * @return {Promise}
 */
export function getUser(email) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('users/' + formatEmail(email))
            .once('value')
            .then(function(snapshot) {
                // console.warn('snap', snapshot, snapshot.exists());
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject('Snapshot does not exist');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
/**
 * updating user details with email
 * @param  email email of logged in user
 * @param data updated user details
 * @return {Promise}
 */
export function updateUser(uid, data) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('users/')
            .child(uid)
            .update({
                name: data.name,
                provider: data.provider,
                picture: data.picture,
                email: data.email
            })
            .then(() => resolve())
            .catch(error => reject(error));
    });
}
