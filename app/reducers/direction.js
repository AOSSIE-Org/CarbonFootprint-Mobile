import {
    REQUEST_DIRECTION,
    RECEIVE_DIRECTION,
    SET_SOURCE,
    SET_DESTINATION,
    SET_REGION,
    SET_DISTANCE,
    SET_DURATION
} from '../actions/DirectionAction';

export default function direction(state = {
    source: {
        latitude: null,
        longitude: null,
    },
    destination: {
        latitude: null,
        longitude: null,
    },
    region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
    },
    coords: null,
    distance: {
        value: null,
        text: null,
    },
    duration: {
        value: null,
        text: null
    },
    isFetching: false,
    sourceName: "Your Location",
    destinationName: "Where to?",
}, action) {
    switch(action.type) {
        case SET_SOURCE:
            return Object.assign({}, state, {
                source: action.source,
                sourceName: action.sourceName,
            });
        case SET_DESTINATION:
            return Object.assign({}, state, {
                destination: action.destination,
                destinationName: action.destinationName,
            });
        case REQUEST_DIRECTION:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_DIRECTION:
            return Object.assign({}, state, {
                isFetching: false,
                coords: action.coords,
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
        default:
            return state;
    }
}
