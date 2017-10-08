/*
 * Detecting user's activity and sending activity data to store in Realm Db
*/

import {
    Platform
} from 'react-native';

import ActivityRecognition from 'react-native-activity-recognition';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import { setDate, setStartTime, setDuration, setSrc, setDest, setType, setDistance, setCO2 } from '../actions/ActivityDetailsAction';
import { formatAMPM, getPlaceName } from '../config/helper';

async function sendDataForStorage(state) {
  var act = state.activity;
  var source = "Source";
  var destin = "Destination";
  if(act.src.latitude === -1) {
    alert("Error in fetching location (source)");
  } else {
    await getPlaceName(act.src).then(
      (place) => source = place
    ).catch(
      error => {
        //console.log("ActivityDetectionAction (sendDataForStorage 1)" + error)
      });
  }
  if(act.dest.latitude === -1) {
    //console.log("Error in fetching location (destination)");
  } else {
    await getPlaceName(act.dest).then(
      (place) => destin = place
    ).catch(
      error => {
        //console.log("ActivityDetectionAction (sendDataForStorage 2)" + error)
      });
  }
  var data = {
    actDate: act.date,
    startTime: act.startTime,
    duration: act.duration,
    src: source,
    dest: destin,
    actType: act.type,
    distance: act.distance,
    co2Emitted: act.type === 'IN_VEHICLE'? act.co2: 0,
    co2Saved: act.type === 'IN_VEHICLE'? 0: act.co2
  };
  /*console.log("Activity data sent for local storage. Date: " + data.actDate + ", Start time: " + data.startTime + ", Duration: " + 
    data.duration + ", Source: " + data.src + ", Destination: " + data.dest + ", Type: " + data.actType + 
    ", Distance: " + data.distance + ", co2 emitted: " + data.co2Emitted + ", co2 saved: " + data.co2Saved);*/
  ActivityHistoryStorage.insertData(data);
}

export function startActivityDetection() {
  return function (dispatch, getState) {
    ActivityHistoryStorage.createDB();
    // Interval (in ms) for Activity detection updates
    const detectionIntervalMillis = 100;
    ActivityRecognition.start(detectionIntervalMillis);
    // Subscribe to updates
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      //console.log("Activity is being detected ...");
      const mostProbableActivity = detectedActivities.sorted[0];
      var act = getState().activity;
      // If detected activity is different from ongoing activity
      if(mostProbableActivity.type !== act.type) {
        if((Platform.OS === 'android' && mostProbableActivity.confidence >= 75) || (Platform.OS === 'ios')) {
          //if(act.type !== 'STILL' && act.type !== 'TILTING' && act.type !== 'UNKNOWN')
            sendDataForStorage(getState());
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
  // Stop activity detection and remove the listener
  ActivityRecognition.stop();
  this.unsubscribe();
}