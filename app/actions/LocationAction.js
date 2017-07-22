import {
    set_source,
    getRegion,
    set_region
} from './DirectionAction';
import { PermissionsAndroid } from 'react-native';

export const REQUEST_LOCATION = "REQUEST_LOCATION";
export const RECEIVE_LOCATION = "RECEIVE_LOCATION";

import { Platform } from 'react-native';

function request_location() {
    return {
        type: REQUEST_LOCATION
    }
}

function receive_location(latitude, longitude) {
    return {
        type: RECEIVE_LOCATION,
        latitude: latitude,
        longitude: longitude
    }
}

async function getPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Carbon Footprint Geolocation Permission',
                'message': 'Allow Carbon Footprint to access your current location'
            }
        );
        console.log("Granted");
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            console.log("Not Granted");
            return false;
        }
    } catch (err) {
        console.log("Error", err);
        return false;
    }
}

export function getLocation() {
    return async function(dispatch, state) {
        dispatch(request_location());
        let value = true;
        if (Platform.OS === 'android') {
            value = await getPermission();
        }
        if (value) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    dispatch(receive_location(lat, lng));
                    getRegion({ latitude: lat, longitude: lng }, null)
                    .then(result => {
                        dispatch(set_region(result));
                        dispatch(set_source({
                            latitude: lat,
                            longitude: lng,
                        }, "Your Location"));
                    })
                },
                (error) => {console.log("Geolocation Error: ", error)},
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }

    }
}
