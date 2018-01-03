import {
    Platform,
    BackHandler
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { geocodingAPIKey } from './keys';
import store from '../config/store';
import { RATE_PETROL, RATE_DIESEL, RATE_CNG, RATE_ELECTRIC } from '../config/constants';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export function getIcon(name) {
  return (Platform.OS === "android" ? "md-": "ios-") + name;
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
         resolve(json.results[0].formatted_address);
      },
      error => {
         //console.log("helper (getPlaceName): " + error);
         reject(error);
      }
    );
 });
} 

export function calcCo2(fuelRate, distance, mileage) {
  // co2 in kg
  distance = distance.replace(/\,/g, ""); // To remove comma (,) from string
  var dist = parseFloat(distance.split(" ")[0]);
  return fuelRate * (dist / mileage);
}

export function getIconName(activity) {
	/*
   * Selecting activity icon based on detected activity
   * For more information about detected activities, check below link -
   * https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity
  */
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

export function getMileage() {
  const data = store.getState().storage.data;
  var val = data.value;
  // 1 km/litre = 2.35215 miles/gallon
  if(data.unit === "miles/gallon")
    val = val / 2.35215;
  return val;
}

export function getFuelRate() {
  const data = store.getState().storage.data;
  var rate;
  switch(data.type) {
    case "Petrol": {
      rate = RATE_PETROL;
      break;
    }
    case "Diesel": {
      rate = RATE_DIESEL;
      break;
    }
    case "CNG": {
      rate = RATE_CNG;
      break;
    }
    case "Electric": {
      rate = RATE_ELECTRIC;
    }
    default: {
      rate = RATE_PETROL;
    }
  }
  return rate;
}

export function checkGPS() {
  LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Enable GPS</h2>This app wants to use GPS. Please enable GPS.",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
      showDialog: true // false => Opens the Location access page directly
  }).then(function(success) {
        //return true;
      }.bind(this)
  ).catch((error) => {
      //return false;
      //console.log(error.message);
  });
  
  BackHandler.addEventListener('hardwareBackPress', () => {
         LocationServicesDialogBox.forceCloseDialog();
  });
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