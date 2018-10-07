import {
    REQUEST_AUTH,
    RECEIVE_AUTH,
    RECEIVE_ERROR,
    ADD_USER_FIRABASE
} from '../actions/AuthAction';

/**
 * login reducer to handle authentication
 * @param  Object state type of data which changes in component and rerenders
 * @param  action which tells reducer to perform certain action
 * @return {state} based on action the function changes the state and rerenders
 */
export default function login(
    state = {
        isFetching: false,
        user: {},
        error: ''
    },
    action
) {
    switch (action.type) {
        case REQUEST_AUTH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_AUTH:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.user,
                error: ''
            });
        case ADD_USER_FIRABASE:
            return Object.assign({}, state, {
                user: action.user,
                error: ''
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                user: null,
                error: action.error.message
            });
        default:
            return state;
    }
}
