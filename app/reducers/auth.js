import {
    REQUEST_AUTH,
    RECEIVE_AUTH,
    RECEIVE_ERROR,
} from '../actions/AuthAction';

export default function login(state = {
    isFetching: false,
    user: {},
    error: "",
}, action) {
    switch(action.type) {
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
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                user: null,
                error: action.error,
            })
        default:
            return state;
    }
}
