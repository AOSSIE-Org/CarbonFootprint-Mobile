import * as firebase from 'firebase';
import {
    getUser
} from './User';

/*
    Do all the calculations locally. Query Firebase only to set (not to update).
    Example Data Object to set.

    data = {
        total: {
            time:
            footprint:
            distance:
        },
        car: {
            time:
            footprint:
            distance:
        },
        transit: {
            time:
            footprint:
            distance:
        },
        cycling: {
            time:
            footprint:
            distance:
        },
        walking: {
            time:
            footprint:
            distance:
        },
    }

    currentUid: UID of the logged in user to set.
*/
export function setFootprint(data, currentUid) {
    return new Promise(function(resolve, reject) {
        firebase.database().ref('users/' + currentUid + "/data")
        .set(data)
        .then(() => {
            getUser(currentUid)
            .then((user) => {
                alert("Data sent in Firebase. UID: " + currentUid);
                resolve(user);
            }).catch((error) => reject(error))
        })
        .catch((error) => reject(error))
    });
}
