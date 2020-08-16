import { mapboxKey } from '../config/keys';
import crashlytics from '@react-native-firebase/crashlytics';

export const REQUEST_DIRECTION = 'REQUEST_DIRECTION';
export const RECEIVE_DIRECTION = 'RECEIVE_DIRECTION';
export const SET_SOURCE = 'SET_SOURCE';
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_REGION = 'SET_REGION';
export const SET_DISTANCE = 'SET_DISTANCE';
export const SET_DURATION = 'SET_DURATION';
export const NO_DIRECTION = 'NO_DIRECTION';

/**
 * Action Creator to set Source
 * @param json
 * @param name
 * @return {Object} action for SET_SOURCE
 */
export function set_source(json, name) {
    return {
        type: SET_SOURCE,
        source: json,
        sourceName: name
    };
}

/**
 * Action Creator to set Destination
 * @param  json
 * @param  name
 * @return {Object} action for SET_DESTINATION
 */
export function set_destination(json, name) {
    return {
        type: SET_DESTINATION,
        destination: json,
        destinationName: name
    };
}

/**
 * Action Creator to set region
 * @param  json
 * @return {Object} action for SET_REGION
 */
export function set_region(json) {
    return {
        type: SET_REGION,
        region: json
    };
}

/**
 * Action Creator to set Distance
 * @param json
 * @return {Object} action for SET_DISTANCE
 */
function set_distance(value) {
    return {
        type: SET_DISTANCE,
        distance: value
    };
}

/**
 * Action Creator to set Duration
 * @param json
 * @return {Object} action for SET_DURATION
 */
function set_duration(value) {
    return {
        type: SET_DURATION,
        duration: value
    };
}

/**
 * This is essentially a hack.
 * Need to take Earth's Spherical nature into account
 * @param  source      starting point of travel
 * @param  destination ending point of travel
 * @return {Promise}
 */
export function getRegion(source, destination) {
    return new Promise(function(resolve, reject) {
        let data = {};
        if (destination == null) {
            data = {
                latitude: source.latitude,
                longitude: source.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
            };
        } else {
            let minX = Math.min(source.latitude, destination.latitude);
            let minY = Math.min(source.longitude, destination.longitude);
            let maxX = Math.max(source.latitude, destination.latitude);
            let maxY = Math.max(source.longitude, destination.longitude);
            //alert("(maxX - minX): " + (maxX - minX) + ", (maxY - minY): " + (maxY - minY));
            data = {
                latitude: (minX + maxX) / 2,
                longitude: (minY + maxY) / 2,
                latitudeDelta: Math.max(maxX - minX + 0.1, 0.03),
                longitudeDelta: Math.max(maxY - minY + 0.1, 0.03)
            };
        }
        resolve(data);
    });
}

/**
 * Action Creator to request Direction
 * @return {Object} action for REQUEST_DIRECTION
 */
function request_direction() {
    return {
        type: REQUEST_DIRECTION
    };
}

/**
 * Action Creator to recieve Direction
 * @param json
 * @return {Object} action for RECEIVE_DIRECTION
 */
function receive_direction(json) {
    return {
        type: RECEIVE_DIRECTION,
        coords: json
    };
}

/**
 * Action Creator if Route is not Found
 * @return {Object} action for NO_DIRECTION
 */
function no_direction() {
    return {
        type: NO_DIRECTION
    };
}

/**
 * helper class to formatLocation
 * @param  x location
 * @return String latitude and longitude
 */
function formatLocation(x) {
    return x.latitude.toString() + ',' + x.longitude.toString();
}

export function getRedMarkerDetails(location, placename) {
    return dispatch => {
        getRegion({ latitude: location.latitude, longitude: location.longitude }, null).then(
            result => {
                dispatch(set_region(result));
                dispatch(set_source(location, placename));
            }
        );
    };
}

export function getGreenMarkerDetails(location, placename) {
    return dispatch => {
        dispatch(set_destination(location, placename));
    };
}

/**
 * Getting Directions From Google Maps API By Passing The Source,Destination And Code
 * @param String source start point of travel
 * @param String destination end point of travel
 * @param number code 1 for transit, 2 for bicycling, 3 for walking
 */
export function getDirections(source, destination, code) {
    return (dispatch, state) => {
        dispatch(request_direction());
        let start = source.longitude.toString() + ',' + source.latitude.toString();
        let end = destination.longitude.toString() + ',' + destination.latitude.toString();
        let mode = '';
        if (code === 1) {
            mode = 'driving/';
        } else if (code === 2) {
            mode = 'cycling/';
        } else if (code === 3) {
            mode = 'walking/';
        } else {
            mode = 'driving/';
        }

        return fetch(
            'https://api.mapbox.com/directions/v5/mapbox/' +
                mode +
                start +
                ';' +
                end +
                '?geometries=geojson&access_token=' +
                mapboxKey
        )
            .then(response => response.json())
            .then(json => {
                // Handle case for routes not found
                if (!('routes' in json) || json.routes.length <= 0) {
                    dispatch(no_direction());
                    getRegion(source, destination).then(result => {
                        dispatch(set_region(result));
                    });
                } else {
                    dispatch(set_distance(json.routes[0].distance));
                    dispatch(set_duration(json.routes[0].duration));
                    getRegion(source, destination).then(result => {
                        dispatch(set_region(result));
                        dispatch(receive_direction(json.routes[0].geometry));
                    });
                }
            })
            .catch(error => {
                crashlytics().log('Error while getting direction' + error.message);
            });
    };
}
