import {
    Platform
} from 'react-native';

export function getIcon(name) {
    return (Platform.OS === "android" ?
        "md-": "ios-") + name;
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