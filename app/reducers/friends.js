import {
    REQUEST_FRIENDS,
    RECEIVE_FRIENDS,
    RECEIVE_ERROR
} from '../actions/FriendsAction';

/**
 * friends reducer to handle friends section state
 * @param  Object state type of data which changes in component and rerenders
 * @param  action  tells reducer to perform certain actions
 * @return {state}   based on action the function changes the state and rerenders
 */
export default function friends(
    state = {
        isFetching: false,
        list: null,
        error: ''
    },
    action
) {
    switch (action.type) {
        case REQUEST_FRIENDS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_FRIENDS:
            return Object.assign({}, state, {
                isFetching: false,
                list: action.list,
                error: ''
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                list: null,
                error: action.error
            });
        default:
            return state;
    }
}
