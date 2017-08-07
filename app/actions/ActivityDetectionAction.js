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
import store from '../config/store';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import { setDate, setStartTime, setEndTime, setType } from '../actions/ActivityDetailsAction';

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function startActivityDetection() {
  return function (dispatch) {
    alert("Activity is being detected ...");
    ActivityHistoryStorage.createDB();

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
      var activity = store.getState().activity;
      if(mostProbableActivity.type !== activity.type) {
        if((Platform.OS === 'android' && mostProbableActivity.confidence >= 75) || (Platform.OS === 'ios')) { 
            var curr = new Date();
            dispatch(setEndTime(formatAMPM(curr))); 
            alert("Activity change detected. New activity - " + mostProbableActivity.type);
            var data = {
              actId: 1,
              actDate: activity.date,
              startTime: activity.startTime,
              endTime: activity.endTime,
              src: activity.src,
              dest: activity.dest,
              actType: activity.type,
              distance: activity.distance,
              co2Emitted: activity.co2
            };
            alert("Activity data sent for local storage");
            ActivityHistoryStorage.insertData(data);
            dispatch(setDate(curr.toDateString()));
            dispatch(setStartTime(formatAMPM(curr)));
            dispatch(setType(mostProbableActivity.type));
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