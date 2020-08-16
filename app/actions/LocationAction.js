import { set_source, getRegion, set_region } from './DirectionAction';
import { PermissionsAndroid } from 'react-native';
import { checkGPS } from '../config/helper';

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

import { Platform } from 'react-native';
import { GEOLOCATION_PERMISSION, GRANT_PERMISSION } from '../config/constants';
import Geolocation from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * action creator to request location
 * @return {Object} action for REQUEST_LOCATION
 */
function request_location() {
    return {
        type: REQUEST_LOCATION
    };
}

/**
 * action creator to recieve user location
 * @param latitude
 * @param longitude
 * @return {Object} action for RECEIVE_LOCATION
 */
function receive_location(latitude, longitude) {
    return {
        type: RECEIVE_LOCATION,
        latitude: latitude,
        longitude: longitude
    };
}

/**
 * getting run time permissions for user location access
 * @return boolean permission
 */
export async function getPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: GEOLOCATION_PERMISSION,
                message: GRANT_PERMISSION
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        crashlytics().log('Error while getting permission' + err);
        return false;
    }
}
/**
 * getting user location
 * @return async function handling location
 */
export function getLocation() {
    return async function(dispatch, state) {
        dispatch(request_location());
        let value = true;
        if (Platform.OS === 'android') {
            checkGPS();
        }
        if (value) {
            Geolocation.getCurrentPosition(
                position => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    dispatch(receive_location(lat, lng));
                    getRegion({ latitude: lat, longitude: lng }, null).then(result => {
                        dispatch(set_region(result));
                        dispatch(
                            set_source(
                                {
                                    latitude: lat,
                                    longitude: lng
                                },
                                'Your Location'
                            )
                        );
                    });
                },
                error => {
                    crashlytics().log('Error while getting location' + error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 10000
                }
            );
            /* Getting location updates (Only when location changes). This is going haywire on ios simulator so commenting it for now.
              this.watchID = navigator.geolocation.watchPosition((position) => {
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
              (error) => {
                //console.log(error.message)
              },
              {enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter:1}
              );
            */
        }
    };
}
