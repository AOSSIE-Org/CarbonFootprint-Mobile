import { REQUEST_FORGOT, RECEIVE_FORGOT } from '../actions/AuthAction';

/**
 * forgot reducer handles the forgot password feature
 * @param  Object state type of data which changes in component and rerenders
 * @param  action  tells reducer to perform certain actions
 * @return {state} based on action the function changes the state and rerenders
 */
export default function forgot(
    state = {
        isFetching: false,
        message: ''
    },
    action
) {
    switch (action.type) {
        case 'REQUEST_FORGOT':
            return Object.assign({}, state, {
                isFetching: true,
                message: ''
            });
        case RECEIVE_FORGOT:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message
            });
        default:
            return state;
    }
}
