import { REQUEST_LOGIN, RECIEVE_LOGIN } from '../actions/SimpleAction';

export default function login(state = {
    isFetching: false
}, action) {
    switch(action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECIEVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
