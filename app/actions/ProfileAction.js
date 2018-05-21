import * as firebase from 'firebase';

import { getUser } from './firebase/User';
import { requestAuth, receiveAuth, receiveError } from './AuthAction';

/**
 * getting current logged in user details
 * @return function handling Profile
 */
export function getProfile() {
    return (dispatch, getState) => {
        dispatch(requestAuth());
        const uid = getState().auth.user.uid;
        getUser(uid)
            .then(user => {
                dispatch(receiveAuth(user));
            })
            .catch(error => {
                dispatch(receiveError(error));
            });
    };
}
