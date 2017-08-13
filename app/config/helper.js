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