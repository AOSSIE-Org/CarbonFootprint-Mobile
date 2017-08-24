import {
    Platform
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { geocodingAPIKey } from './keys';

export function getIcon(name) {
    return (Platform.OS === "android" ?
        "md-": "ios-") + name;
}

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

export function getPlaceName(loc) {
  return new Promise((resolve, reject) => {
    Geocoder.setApiKey(geocodingAPIKey);
    Geocoder.getFromLatLng(loc.latitude, loc.longitude).then(
      json => {
        /*
         var address_component = json.results[0].address_components[0];
         place = address_component.long_name;
        */
         resolve(json.results[0].formatted_address);
      },
      error => {
         alert("helper (getPlaceName): " + error);
         reject(error);
      }
    );
 });
} 

export function calcCo2(fuelRate, distance, mileage) {
  // co2 in kg
  return fuelRate * (distance / mileage);
}

export function getIconName(activity) {
	// Selecting activity icon based on detected activity
  // For more information about detected activity, check below link -
  // https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity
    var icon;
    switch(activity) {
      case 'IN_VEHICLE': {
        icon = "car";
        break;
      }
      case 'ON_BICYCLE': {
        icon = "bicycle";
        break;
      }
      case 'ON_FOOT':
      case 'WALKING': {
        icon = "walk";
        break;
      }
      case 'RUNNING': {
        icon = "run";
        break;
      }
      default: {
        icon = "close";
        break;
      }
    }
    return icon;
}

export const color = {
    primary: "#2f8e92",
    lightPrimary: "#30999e",
    darkPrimary: "#2e8286",
    secondary: "#92492f",
    error: "#cc0000",
    black: "#343434",
    white: "#fff",
    greyBack: "#f7f7f7",
    shadowGrey: "#ddd",
    borderGrey: "#ddd",
    grey: "#eee",
    lightBlack: "#777",
}