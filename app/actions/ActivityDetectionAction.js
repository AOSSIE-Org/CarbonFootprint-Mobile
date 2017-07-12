/*
    This is for detecting user's activity such as Walking, In Vehicle, Still etc.
    This is for Android only.
    Currently there is no package available for Activity detection for iOS. So we will develop it from scratch later.
    Used External package - 'react-native-activity-recognition'
*/

import {
    Platform
} from 'react-native';

import ActivityRecognition from 'react-native-activity-recognition';

export function detectActivity() {
  return function (dispatch) {
    alert("Activity is being detected ...");

    // Interval (in ms) for Activity detection updates
    const detectionIntervalMillis = 100;

    // Starting Activity detection/recognition
    if (Platform.OS === "android") {
        ActivityRecognition.start(detectionIntervalMillis);

        // Subscribe to updates
        this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {

          // Activity having maximum probability (confidence) among all detected activities
          const mostProbableActivity = detectedActivities.sorted[0] ;
          //if(mostProbableActivity.confidence >= 75) {
            alert("Detected Activity: " + mostProbableActivity.type + ", Confidence: " + mostProbableActivity.confidence);
          //}
        });
    }

    //Stop activity detection and remove the listener
    //ActivityRecognition.stop() ;
    //this.unsubscribe() ;
  }
}
