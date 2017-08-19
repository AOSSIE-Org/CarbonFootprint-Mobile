import RNGooglePlaces from 'react-native-google-places';
import Polyline from '@mapbox/polyline';

export const REQUEST_DIRECTION = "REQUEST_DIRECTION";
export const RECEIVE_DIRECTION = "RECEIVE_DIRECTION";
export const SET_SOURCE = "SET_SOURCE";
export const SET_DESTINATION = "SET_DESTINATION";
export const SET_REGION = "SET_REGION";
export const SET_DISTANCE = "SET_DISTANCE";
export const SET_DURATION = "SET_DURATION";
export const NO_DIRECTION = "NO_DIRECTION";

export function set_source(json, name) {
    return {
        type: SET_SOURCE,
        source: json,
        sourceName: name,
    }
}

export function set_destination(json, name) {
    return {
        type: SET_DESTINATION,
        destination: json,
        destinationName: name
    }
}

export function set_region(json) {
    return {
        type: SET_REGION,
        region: json
    }
}

function set_distance(json) {
    return {
        type: SET_DISTANCE,
        distance: json
    }
}

function set_duration(json) {
    return {
        type: SET_DURATION,
        duration: json
    }
}

/* This is essentially a hack.
 * Need to take Earth's Spherical nature into account
 */
export function getRegion(source, destination) {
    return new Promise(function(resolve, reject) {
        let data = {}
        if (destination == null) {
            data = {
                latitude: source.latitude,
                longitude: source.longitude,
                latitudeDelta: 0.032,
                longitudeDelta: 0.032
            }

        } else {
            let minX = Math.min(source.latitude, destination.latitude);
            let minY = Math.min(source.longitude, destination.longitude);
            let maxX = Math.max(source.latitude, destination.latitude);
            let maxY = Math.max(source.longitude, destination.longitude);
            data = {
                latitude: (minX + maxX) / 2,
                longitude: (minY + maxY) / 2,
                latitudeDelta: Math.max((maxX - minX), 0.032),
                longitudeDelta: Math.max((maxY - minY), 0.032)
            }
        }
        resolve(data);
    });
}

function request_direction() {
    return {
        type: REQUEST_DIRECTION
    }
}

function receive_direction(json) {
    return {
        type: RECEIVE_DIRECTION,
        coords: json
    }
}

function no_direction() {
    return {
        type: NO_DIRECTION,
    }
}

function formatLocation(x) {
    return x.latitude.toString() + ',' + x.longitude.toString();
}

// Key value is 0 for source, 1 for destination.
export function openSearchModal(key) {
    return (dispatch) => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                let data = {};
                data.latitude = place.latitude;
                data.longitude = place.longitude;
                // 0 is source and 1 is destination
                if (key === 0) {
                    getRegion(
                        { latitude: data.latitude, longitude: data.longitude},
                        null)
                        .then(result => {
                            dispatch(set_region(result));
                            dispatch(set_source(data, place.name));
                        })
                } else {
                    dispatch(set_destination(data, place.name));
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

export function getDirections(source, destination, code) {
    return (dispatch, state) => {
        dispatch(request_direction());
        let start = source.latitude.toString() + ',' + source.longitude.toString();
        let end = destination.latitude.toString() + ',' + destination.longitude.toString();
        let mode = "";
        if (code === 1) {
            mode = "transit"
        } else if (code === 2) {
            mode = "bicycling"
        } else if (code === 3) {
            mode = "walking"
        } else {
            mode = "driving"
        }

        return fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=${mode}&origin=${start}&destination=${end}`)
            .then(response => response.json())
            .then(json => {
                // Handle case for routes not found
                if (!("routes" in json) || json.routes.length <= 0) {
                    dispatch(no_direction());
                    getRegion(source, destination)
                    .then(result => {
                        dispatch(set_region(result));
                    })
                } else {
                    let legs = json.routes[0].legs[0];
                    dispatch(set_distance(legs.distance));
                    dispatch(set_duration(legs.duration));

                    let points = Polyline.decode(json.routes[0].overview_polyline.points);
                    let coords = points.map((point, index) => {
                        return  {
                            latitude : point[0],
                            longitude : point[1]
                        }
                    });
                    getRegion(source, destination)
                    .then(result => {
                        dispatch(set_region(result));
                        dispatch(receive_direction(coords));
                    })
                }
            })
            .catch(error => console.log(error))
    }
}
