import {
    REQUEST_STORAGE,
    RECEIVE_STORAGE
} from '../actions/StorageAction';

export default function storage(state = {
    isFetching: false,
    data: {
        automobile: "Car",
        type: "Petrol",
        // This is just random
        value: '10.3',
        unit: 'km/litre',
    },
}, action) {
    switch(action.type) {
        case REQUEST_STORAGE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_STORAGE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
            });
        default:
            return state;
    }
}
