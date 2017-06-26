import {
    REQUEST_STORAGE,
    RECEIVE_STORAGE
} from '../actions/StorageAction';

export default function storage(state = {
    isFetching: false,
    token: ""
}, action) {
    switch(action.type) {
        case REQUEST_STORAGE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_STORAGE:
            return Object.assign({}, state, {
                isFetching: false,
                token: action.token
            });
        default:
            return state;
    }
}
