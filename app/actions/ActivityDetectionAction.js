/*
    This is for detecting user's activity such as Walking, In Vehicle, Still etc.
    Used External package - 'react-native-activity-recognition'
*/

import {
    Platform
} from 'react-native';

import ActivityRecognition from 'react-native-activity-recognition';
import store from '../config/store';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import { setDate, setStartTime, setDuration, setSrc, setDest, setType, setDistance, setCO2 } from '../actions/ActivityDetailsAction';
import { formatAMPM, getPlaceName } from '../config/helper';

async function sendDataForStorage() {
  var act = store.getState().activity;
  var source = "Source";
  var destin = "Destination";
  if(act.src.latitude === -1) {
    alert("Error in fetching location (source)");
  } else {
    await getPlaceName(act.src).then(
      (place) => source = place
    ).catch(
      error => alert("ActivityDetectionAction (sendDataForStorage 1)" + error)
    );
  }
  if(act.dest.latitude === -1) {
    alert("Error in fetching location (destination)");
  } else {
    await getPlaceName(act.dest).then(
      (place) => destin = place
    ).catch(
      error => alert("ActivityDetectionAction (sendDataForStorage 2)" + error)
    );
  }
  var data = {
    actDate: act.date,
    startTime: act.startTime,
    duration: act.duration,
    src: source,
    dest: destin,
    actType: act.type,
    distance: act.distance,
    co2Emitted: act.co2
  };
  alert("Activity data sent for local storage. Date: " + data.actDate + ", Start time: " + data.startTime + ", Duration: " + 
    data.duration + ", Source: " + data.src + ", Destination: " + data.dest + ", Type: " + data.actType + 
    ", Distance: " + data.distance + ", Co2 emitted: " + data.co2Emitted);
  ActivityHistoryStorage.insertData(data);
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
      var act = store.getState().activity;
      if(mostProbableActivity.type !== act.type) {
        if((Platform.OS === 'android' && mostProbableActivity.confidence >= 75) || (Platform.OS === 'ios')) {
          if(act.type !== 'STILL' && act.type !== 'TILTING' && act.type !== 'UNKNOWN')
            sendDataForStorage();
          var currDate = new Date();
          dispatch(setDate(currDate.toDateString()));
          dispatch(setStartTime(formatAMPM(currDate)));
          dispatch(setDuration(0));
          dispatch(setSrc(act.dest));
          dispatch(setType(mostProbableActivity.type));
          dispatch(setDistance(0));
          dispatch(setCO2(0));
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