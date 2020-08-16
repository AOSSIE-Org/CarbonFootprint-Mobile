/*
 * Detecting user's activity and sending activity data to store in Realm Db
 */

import { Platform } from 'react-native';

import ActivityRecognition from 'react-native-activity-recognition';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import BackgroundTimer from 'react-native-background-timer';
import {
    setDate,
    setStartTime,
    setDuration,
    setSrc,
    setType,
    setDistance,
    setCO2
} from '../actions/ActivityDetailsAction';
import { formatAMPM, getPlaceName } from '../config/helper';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Start a timer that runs continuous 1000 milliseconds using react-native-background-timer
 * @param dispatch Dispatches an action. This is the only way to trigger a state change.
 * @param getState Returns the current state tree of your application.
 */

export default class ActivityDetection {
    static intervalId;
    static unsubscribe;

    static startTimer(dispatch, getState) {
        if (Platform.OS === 'android') {
            ActivityDetection.intervalId = BackgroundTimer.setInterval(() => {
                dispatch(setDuration(getState().activity.duration + 1));
            }, 1000);
        } else {
            // Not tested for iOS
            BackgroundTimer.start();
            setInterval(() => {
                dispatch(setDuration(getState().activity.duration + 1));
            }, 1000);
        }
    }

    static stopTimer() {
        if (Platform.OS === 'android') {
            BackgroundTimer.clearTimeout(ActivityDetection.intervalId);
        } else {
            BackgroundTimer.stop();
        }
    }

    static async sendDataForStorage(state) {
        var act = state.activity;
        var source = 'Source';
        var destin = 'Destination';
        if (act.src.latitude === -1) {
            crashlytics().log('Error in fetching location (source)');
        } else {
            await getPlaceName(act.src)
                .then(place => (source = place))
                .catch(error => {
                    crashlytics().log('ActivityDetectionAction (sendDataForStorage 1)' + error);
                });
        }
        if (act.dest.latitude === -1) {
            crashlytics().log('Error in fetching location (destination)');
        } else {
            await getPlaceName(act.dest)
                .then(place => (destin = place))
                .catch(error => {
                    crashlytics().log('ActivityDetectionAction (sendDataForStorage 2)' + error);
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
            co2Emitted: act.type === 'IN_VEHICLE' ? act.co2 : 0,
            co2Saved: act.type === 'IN_VEHICLE' ? 0 : act.co2
        };
        /*console.log("Activity data sent for local storage. Date: " + data.actDate + ", Start time: " + data.startTime + ", Duration: " + 
        data.duration + ", Source: " + data.src + ", Destination: " + data.dest + ", Type: " + data.actType + 
        ", Distance: " + data.distance + ", co2 emitted: " + data.co2Emitted + ", co2 saved: " + data.co2Saved);*/
        ActivityHistoryStorage.insertData(data);
    }
    /**
     * user Activity Detection
     */
    static startActivityDetection() {
        return function(dispatch, getState) {
            ActivityHistoryStorage.createDB();
            // Interval (in ms) for Activity detection updates
            const detectionIntervalMillis = 100;
            if (Platform.OS === 'android') ActivityRecognition.start(detectionIntervalMillis);
            // Subscribe to updates
            ActivityDetection.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
                const mostProbableActivity = detectedActivities.sorted[0];
                var act = getState().activity;
                // If detected activity is different from ongoing activity
                if (mostProbableActivity.type !== act.type) {
                    if (
                        (Platform.OS === 'android' && mostProbableActivity.confidence >= 75) ||
                        Platform.OS === 'ios'
                    ) {
                        if (
                            act.type !== 'STILL' &&
                            act.type !== 'TILTING' &&
                            act.type !== 'UNKNOWN'
                        ) {
                            ActivityDetection.stopTimer();
                            ActivityDetection.sendDataForStorage(getState());
                        }
                        var currDate = new Date();
                        dispatch(setDate(currDate.toDateString()));
                        dispatch(setStartTime(formatAMPM(currDate)));
                        dispatch(setDuration(0));
                        dispatch(setSrc(act.dest));
                        dispatch(setType(mostProbableActivity.type));
                        dispatch(setDistance(0));
                        dispatch(setCO2(0));
                        if (
                            mostProbableActivity.type !== 'STILL' &&
                            mostProbableActivity.type !== 'TILTING' &&
                            mostProbableActivity.type !== 'UNKNOWN'
                        ) {
                            ActivityDetection.startTimer(dispatch, getState);
                        }
                    }
                }
            });
        };
    }
    /**
     * Stop activity detection and remove the listener
     */
    static closeActivityDetection() {
        ActivityRecognition.stop();
        ActivityDetection.unsubscribe();
    }
}
