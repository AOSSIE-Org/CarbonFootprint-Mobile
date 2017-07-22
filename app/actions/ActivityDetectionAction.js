/*
    This is for detecting user's activity such as Walking, In Vehicle, Still etc.
    This is for Android only.
    Currently there is no package available for Activity detection for iOS. So we will develop it from scratch later.
    Used External package - 'react-native-activity-recognition' 
*/

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
      if(mostProbableActivity.confidence >= 75 && mostProbableActivity !== store.getState().activity.activityType) {
        dispatch(setActivity(mostProbableActivity.type));
        //alert("Activity change detected: " + mostProbableActivity.type);
        //alert("Detected Activity: " + mostProbableActivity.type + ", Confidence: " + mostProbableActivity.confidence);
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