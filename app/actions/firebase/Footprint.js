import database from '@react-native-firebase/database';

import { getUser } from './User';
import { formatEmail } from '../../config/helper';

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
        running: {
            time:
            footprint:
            distance:
        }
    }

    currentUid: UID of the logged in user to set.
*/
/**
 *
 * @param  data total co2 emitted by all sources
 * @param  currentUid UID of the loggedin user(unique in db)
 * @return {Promise}
 */
export function setFootprint(data, currentEmail) {
    return new Promise(function(resolve, reject) {
        database()
            .ref('users/' + formatEmail(currentEmail) + '/data')
            .set(data)
            .then(() => {
                getUser(currentEmail)
                    .then(user => {
                        //alert("Data sent in Firebase. UID: " + currentUid);
                        resolve(user);
                    })
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}
