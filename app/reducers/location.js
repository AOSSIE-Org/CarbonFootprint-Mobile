import {
    REQUEST_LOCATION,
    RECEIVE_LOCATION
} from '../actions/LocationAction';

export default function location(state = {
    isFetching: false,
    latitude: null,
    longitude: null
}, action) {
    switch(action.type) {
        case REQUEST_LOCATION:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_LOCATION:
            return Object.assign({}, state, {
                isFetching: false,
                latitude: action.latitude,
                longitude: action.longitude
            });
        default:
            return state;
    }
}
