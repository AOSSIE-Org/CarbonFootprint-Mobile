import {
    REQUEST_DIRECTION,
    RECEIVE_DIRECTION,
    SET_SOURCE,
    SET_DESTINATION,
    SET_REGION,
    SET_DISTANCE,
    SET_DURATION,
    NO_DIRECTION
} from '../actions/DirectionAction';

/**
 * direction reducer to handle source,destination,place,distance,duration,isFetching,coords
 * @param Object state type of data which changes in component and rerenders
 * @param action which tells reducer to perform certain actions
 * @return {state} based on action the function changes the state and rerenders
 */
export default function direction(
    state = {
        source: {
            latitude: null,
            longitude: null
        },
        destination: {
            latitude: null,
            longitude: null
        },
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        },
        coords: null,
        distance: null,
        duration: null,
        isFetching: false,
        sourceName: 'Your Location',
        destinationName: 'Where to?'
    },
    action
) {
    switch (action.type) {
        case SET_SOURCE:
            return Object.assign({}, state, {
                source: action.source,
                sourceName: action.sourceName
            });
        case SET_DESTINATION:
            return Object.assign({}, state, {
                destination: action.destination,
                destinationName: action.destinationName
            });
        case REQUEST_DIRECTION:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_DIRECTION:
            return Object.assign({}, state, {
                isFetching: false,
                coords: action.coords
            });
        case SET_REGION:
            return Object.assign({}, state, {
                region: action.region
            });
        case SET_DISTANCE:
            return Object.assign({}, state, {
                distance: action.distance
            });
        case SET_DURATION:
            return Object.assign({}, state, {
                duration: action.duration
            });
        case NO_DIRECTION:
            return Object.assign({}, state, {
                isFetching: false,
                coords: null,
                duration: null,
                distance: null
            });
        default:
            return state;
    }
}
