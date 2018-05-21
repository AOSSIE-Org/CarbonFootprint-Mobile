import { REQUEST_LOCATION, RECEIVE_LOCATION } from '../actions/LocationAction';

/**
 * location reducer to handle isFetching,latitude and longitude
 * @param  Object state  type of data which changes in component and rerenders
 * @param   action tells reducer to perform certain actions
 * @return {state} based on action the function changes the state and rerenders
 */
export default function location(
    state = {
        isFetching: false,
        latitude: null,
        longitude: null
    },
    action
) {
    switch (action.type) {
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
