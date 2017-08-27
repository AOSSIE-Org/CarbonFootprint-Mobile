import {
    REQUEST_FORGOT,
    RECEIVE_FORGOT
} from '../actions/AuthAction';

export default function forgot(state = {
    isFetching: false,
    message: "",
}, action) {
    switch (action.type) {
        case "REQUEST_FORGOT":
            return Object.assign({}, state, {
                isFetching: true,
                message: '',
            });
        case RECEIVE_FORGOT:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message,
            });
        default:
            return state;
    }
}
