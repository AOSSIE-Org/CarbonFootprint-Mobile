import { getMultiple } from './firebase/Helper';
import { getUser } from './firebase/User';
import { loaderToggle } from './LoaderAction';
import loader from '../reducers/loader';
export const REQUEST_FRIENDS = 'REQUEST_FRIENDS';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

/**
 * action creator to requestFriends
 * @return {Object} action for REQUEST_FRIENDS
 */
function requestFriends() {
    return {
        type: REQUEST_FRIENDS
    };
}

/**
 * action creator to receiveFriends
 * @param list data of friends
 * @return {Object} action for RECEIVE_FRIENDS
 */
function receiveFriends(list) {
    return {
        type: RECEIVE_FRIENDS,
        list
    };
}

/**
 * action creator to recieveError
 * @param error
 * @return {Object} action for RECEIVE_ERROR
 */
function receiveError(error) {
    return {
        type: RECEIVE_ERROR,
        error
    };
}

/**
 * getting user friend list
 * @param choice 1 for list of friends 2 for list of friend requests
 * @return function handling friends
 */
export function getFriendList(choice) {
    return (dispatch, getState) => {
        getUser(getState().auth.user.uid).then(user => {
            dispatch(requestFriends());
            dispatch(loaderToggle());
            var friends = {};
            const obj = user.friends;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (choice === '1' && obj[key] === 0) friends[key] = true;
                    if (choice === '2' && obj[key] === 2) friends[key] = false;
                }
            }
            if (friends === undefined) {
                dispatch(receiveFriends({}));
                dispatch(loaderToggle());
            } else {
                getMultiple(Object.keys(friends)).then(friends => {
                    dispatch(receiveFriends(friends));
                    dispatch(loaderToggle());
                });
            }
        });
    };
}
