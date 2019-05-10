import { Platform } from 'react-native';
import * as ActivityDetectionAction from '../../app/actions/ActivityDetectionAction';
import ActivityRecognition from 'react-native-activity-recognition';
import BackgroundTimer from 'react-native-background-timer';
import * as ActivityDetailsAction from '../../app/actions/ActivityDetailsAction';
import * as Helpers from '../../app/config/helper';
import ActivityHistoryStorage from '../../app/actions/ActivityHistoryStorage';

/*
 Mocking functions called with in the
 functions to be tested to ensure isolation.
*/

ActivityDetailsAction.setDate = jest.fn();
ActivityDetailsAction.setStartTime = jest.fn();
ActivityDetailsAction.setDuration = jest.fn();
ActivityDetailsAction.setSrc = jest.fn();
ActivityDetailsAction.setType = jest.fn();2
ActivityDetailsAction.setDistance = jest.fn();
ActivityDetailsAction.setCO2 = jest.fn();
ActivityHistoryStorage.insertData = jest.fn();
ActivityHistoryStorage.createDB = jest.fn();
Helpers.formatAMPM = jest.fn();
Helpers.getPlaceName = jest.fn(() => Promise.resolve('abc'));
ActivityRecognition.subscribe = jest.fn().mockImplementation((func) => {
    const detectedActivites = {
        sorted: [
            {
                type: 'NOT_STILL',
                confidence: 80,
            } 
        ]
    };
    func(detectedActivites);
});
ActivityRecognition.start = jest.fn();
ActivityRecognition.stop = jest.fn();
BackgroundTimer.setInterval = jest.fn().mockImplementation((func) => {
    func();
});
BackgroundTimer.start = jest.fn();
BackgroundTimer.stop = jest.fn();
BackgroundTimer.clearTimeout = jest.fn();
const dispatch = jest.fn();
const getState = jest.fn(() => {
    return {
        activity: {
            duration: 1,
            type: 'NONE'
        }
    }
});
setInterval = jest.fn().mockImplementation((func) => {
    func();
});

/*
    Testing functions 
    startTimer,
    stopTimer,
    sendDataForStorage,
    startActivityDetection
*/

describe('ActivityDetectionAction', () => {
    test('startTimer function for android', () => {
        Platform.OS = 'android';
        ActivityDetectionAction.startTimer(dispatch, getState);
        expect.assertions(4);
        expect(BackgroundTimer.setInterval).toHaveBeenCalled();
        expect(dispatch).toBeCalled();
        expect(ActivityDetailsAction.setDuration).toBeCalled();
        expect(getState).toBeCalled();
    });

    test('startTimer function for ios', () => {
        Platform.OS = 'ios';
        ActivityDetectionAction.startTimer(dispatch, getState);
        expect.assertions(5);
        expect(BackgroundTimer.start).toHaveBeenCalled();
        expect(setInterval).toHaveBeenCalled();
        expect(dispatch).toBeCalled();
        expect(ActivityDetailsAction.setDuration).toBeCalled();
        expect(getState).toBeCalled();
    });

    test('stopTimer function for android', () => {
        Platform.OS = 'android';
        ActivityDetectionAction.stopTimer();
        expect.assertions(1);
        expect(BackgroundTimer.clearTimeout).toHaveBeenCalled();
    });

    test('stopTimer function for ios', () => {
        Platform.OS = 'ios';
        ActivityDetectionAction.stopTimer();
        expect.assertions(1);
        expect(BackgroundTimer.stop).toHaveBeenCalled();
    });

    test('sendDataForStorage function when location is not known', () => {
        const state = {
            activity: {
                src: {
                    latitude: -1
                },
                dest: {
                    latitude: -1
                },
                date: Date.now(),
                startTime: Date.now(),
                duration: 0,
                actType: 'IN_VEHICLE',
                distance: 0,
                co2: 0
            }
        };
        ActivityDetectionAction.sendDataForStorage(state);
        expect(Helpers.getPlaceName).not.toHaveBeenCalled();
        expect(ActivityHistoryStorage.insertData).toHaveBeenCalled();
    });

    test('sendDataForStorage function when location is known', async() => {
        const state = {
            activity: {
                src: {
                    latitude: 20.5937
                },
                dest: {
                    latitude: 78.9629
                },
                date: Date.now(),
                startTime: Date.now(),
                duration: 0,
                actType: 'IN_VEHICLE',
                distance: 0,
                co2: 0
            }
        };
        await ActivityDetectionAction.sendDataForStorage(state);
        expect(Helpers.getPlaceName).toHaveBeenCalledTimes(2);
        expect(ActivityHistoryStorage.insertData).toHaveBeenCalled();
    });

    test('#startActivityDetection function', async() => {
        Platform.OS = 'android';
        await ActivityDetectionAction.startActivityDetection()(dispatch, getState);
        expect(ActivityHistoryStorage.createDB).toHaveBeenCalled();
        expect(ActivityRecognition.start).toHaveBeenCalled();
        expect(ActivityRecognition.subscribe).toHaveBeenCalled();
        expect(getState).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(8);
    });
});