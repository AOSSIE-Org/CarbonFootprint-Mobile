import { REQUEST_LOGIN, RECIEVE_LOGIN, STORE_USER_INFO } from '../actions/SimpleAction';

export default function login(state = {
    isFetching: false,
    userName: null
}, action) {
    switch(action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                userName: state.userName
            });
        case RECIEVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                userName: state.userName
            });
        case STORE_USER_INFO:
            return Object.assign({}, state, {
                isFetching: state.isFetching,
                userName: action.username
            });
        default:
            return state;
    }
}
