import { Platform, BackHandler } from 'react-native';
import { mapboxKey } from './keys';
import { Alert } from 'react-native';
import store from '../config/store';
import { RATE_PETROL, RATE_DIESEL, RATE_CNG, RATE_ELECTRIC } from '../config/constants';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import RNFetchBlob from 'react-native-fetch-blob';
import { urlRegex } from './constants';

/**
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getIcon(name) {
    return (Platform.OS === 'android' ? 'md-' : 'ios-') + name;
}

/**
 * helper function to format date
 * @param  Date date
 * @return {time} formatted time
 */
export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var time = hours + ':' + minutes + ' ' + ampm;
    return time;
}

/**
 * function to get location name from API
 * @param  object loc location object containing latiude and longitude
 * @return {json} json address
 */
export function getPlaceName(loc) {
    return new Promise((resolve, reject) => {
        fetch(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                loc.longitude +
                ',' +
                loc.latitude +
                '.json?access_token=' +
                mapboxKey
        )
            .then(response => response.json())
            .then(responseJson => {
                resolve(responseJson.features[0].place_name);
            })
            .catch(error => reject(error));
    });
}

/**
 * retrieve co2 in kg using formula
 * @param  float fuelRate different fuel types available in constants.js
 * @param  float distance distance travelled
 * @param  float mileage of vechile
 * @return {float} co2 in kg
 */
export function calcCo2(fuelRate, distance, mileage) {
    //distance = distance.replace(/\,/g, ''); // To remove comma (,) from string
    //var dist = parseFloat(distance.split(' ')[0]);
    var dist = distance / 1000;
    return fuelRate * (dist / mileage);
}

/**
 * Selecting activity icon based on detected activity
 * For more information about detected activities, check below link -
 * https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity]
 * @param  activity detected activity
 * @return {icon} vechile types
 */
export function getIconName(activity) {
    var icon;
    switch (activity) {
        case 'IN_VEHICLE': {
            icon = 'car';
            break;
        }
        case 'ON_BICYCLE': {
            icon = 'bicycle';
            break;
        }
        case 'ON_FOOT':
        case 'WALKING': {
            icon = 'walk';
            break;
        }
        case 'RUNNING': {
            icon = 'run';
            break;
        }
        default: {
            icon = 'close';
            break;
        }
    }
    return icon;
}

/**
 * function to get mileage
 * @return {float} val Mileage
 */
export function getMileage() {
    const data = store.getState().storage.data;
    var val = data.value;
    // 1 km/litre = 2.35215 miles/gallon
    if (data.unit === 'miles/gallon') val = val / 2.35215;
    return val;
}

/**
 * function to get fuelRate
 * @return {float} rate constant available in constants.js
 */
export function getFuelRate() {
    const data = store.getState().storage.data;
    var rate;
    switch (data.type) {
        case 'Petrol': {
            rate = RATE_PETROL;
            break;
        }
        case 'Diesel': {
            rate = RATE_DIESEL;
            break;
        }
        case 'CNG': {
            rate = RATE_CNG;
            break;
        }
        case 'Electric': {
            rate = RATE_ELECTRIC;
        }
        default: {
            rate = RATE_PETROL;
        }
    }
    return rate;
}

/**
 * check gps at run time to enable or disable
 * @return {Alert} gps enabled or disabled
 */
export function checkGPS() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h2>Enable GPS</h2>This app wants to use GPS. Please enable GPS.',
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
        showDialog: true // false => Opens the Location access page directly
    })
        .then(
            function(success) {
                //return true;
            }.bind(this)
        )
        .catch(error => {
            //return false;
            //console.log(error.message);
        });

    BackHandler.addEventListener('hardwareBackPress', () => {
        LocationServicesDialogBox.forceCloseDialog();
    });
}

/**
 * showing up a alert dialog with passed parameters
 * @param  header
 * @param  message
 * @param  buttonLabel
 * @return JSX alert
 */
export function showAlert(header, message, buttonLabel) {
    return Alert.alert(
        header,
        message,
        [
            {
                text: buttonLabel
            }
        ],
        { cancelable: false }
    );
}

/*
 * updates userData object with base64 encoded picture string
 */
export function urlToBase64(userData) {
    var isURLValid = urlRegex.test(userData.picture);
    return new Promise((resolve, reject) => {
        const fs = RNFetchBlob.fs;
        let imagePath = null;
        if (isURLValid) {
            RNFetchBlob.config({
                fileCache: true
            })
                .fetch('GET', `${userData.picture}?height=500`) // for higher quality image
                .then(resp => {
                    imagePath = resp.path();
                    return resp.readFile('base64');
                })
                .then(base64Data => {
                    userData.picture = base64Data;
                    fs.unlink(imagePath);
                    resolve(userData);
                });
        } else resolve(userData);
    });
}

/*
 * Format email(replacing '.' to ','), so that it can be used as a primary key.
 * Firebase doesn't allow '.'(dot) to be used in the key text
 */

export function formatEmail(userEmail) {
    return userEmail.replace(/\./g, ',');
}

export const formatName = name => {
    return name.replace(/['"]+/g, '');
};

/*colors*/
export const color = {
    primary: '#2f8e92',
    lightPrimary: '#30999e',
    darkPrimary: '#2e8286',
    secondary: '#92492f',
    error: '#cc0000',
    black: '#343434',
    white: '#fff',
    greyBack: '#f7f7f7',
    shadowGrey: '#ddd',
    borderGrey: '#ddd',
    grey: '#eee',
    lightBlack: '#777'
};

export const newColors = {
    // primary: '#0C0F18',
    // lightPrimary: '#1B264F',
    // darkPrimary: '#2e8286',
    // secondary: '#2191FB',
    primary: '#2f8e92',
    lightPrimary: '#30999e',
    darkPrimary: '#2e8286',
    secondary: '#30999e',
    error: '#cc0000',
    black: '#161616',
    white: '#fff',
    greyBack: '#f7f7f7',
    shadowGrey: '#ddd',
    borderGrey: '#ddd',
    grey: '#eee',
    lightBlack: '#777',
    disableGrey: '#D7D7D7'
};
