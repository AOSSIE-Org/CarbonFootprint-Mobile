import { REQUEST_LOGIN, RECEIVE_LOGIN } from '../actions/SimpleAction';

export default function login(state = {
    isFetching: false
}, action) {
    switch(action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}
