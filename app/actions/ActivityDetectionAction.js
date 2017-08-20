/*
    This is for detecting user's activity such as Walking, In Vehicle, Still etc.
    Used External package - 'react-native-activity-recognition'
*/

import {
    Platform
} from 'react-native';

import ActivityRecognition from 'react-native-activity-recognition';
import store from '../config/store';

export const SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE";

export function startActivityDetection() {
  return function (dispatch) {
    alert("Activity is being detected ...");

    // Interval (in ms) for Activity detection updates
    const detectionIntervalMillis = 100;

    // Starting Activity detection/recognition
    ActivityRecognition.start(detectionIntervalMillis);

    // Subscribe to updates
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {

      // Activity having maximum probability (confidence) among all detected activities
      const mostProbableActivity = detectedActivities.sorted[0];

      // If detected activity is different from ongoing activity,
      // set this detected activity in current state.
      if(mostProbableActivity !== store.getState().activity.activityType) {
        if(Platform.OS === 'android') {
          if(mostProbableActivity.confidence >= 75) {
            dispatch(setActivity(mostProbableActivity.type));
          }
        } else { // iOS
            dispatch(setActivity(mostProbableActivity.type));
        }
      }
    });
  }
}

export function closeActivityDetection() {

  //Stop activity detection and remove the listener
  ActivityRecognition.stop() ;
  this.unsubscribe() ;
}

// Storing current detected activity in store (current state)
export function setActivity(actType) {
  return {
    type: SET_ACTIVITY_TYPE,
    activityType: actType
  }
}
