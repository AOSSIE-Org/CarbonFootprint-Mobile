/*
 * Action creators to save activity data in Redux store
 */

export const SET_ACTIVITY_DATE = 'SET_ACTIVITY_DATE';
export const SET_ACTIVITY_START_TIME = 'SET_ACTIVITY_START_TIME';
export const SET_ACTIVITY_DURATION = 'SET_ACTIVITY_DURATION';
export const SET_ACTIVITY_SRC = 'SET_ACTIVITY_SRC';
export const SET_ACTIVITY_DEST = 'SET_ACTIVITY_DEST';
export const SET_ACTIVITY_TYPE = 'SET_ACTIVITY_TYPE';
export const SET_ACTIVITY_DISTANCE = 'SET_ACTIVITY_DISTANCE';
export const SET_ACTIVITY_CO2 = 'SET_ACTIVITY_CO2';

/**
 * Action Creator to set Activity Date
 * @param val date
 * @return {Object} action for SET_ACTIVITY_DATE
 */
export function setDate(val) {
    return {
        type: SET_ACTIVITY_DATE,
        value: val
    };
}

/**
 * Action Creator to set Activity Start Time
 * @param  val start time
 * @return {Object} action for SET_ACTIVITY_START_TIME
 */
export function setStartTime(val) {
    return {
        type: SET_ACTIVITY_START_TIME,
        value: val
    };
}

/**
 * Action Creator to set Activity Duration
 * @param val activity duration
 * @return {Object} action for SET_ACTIVITY_DURATION
 */
export function setDuration(val) {
    return {
        type: SET_ACTIVITY_DURATION,
        value: val
    };
}

/**
 * Action Creator to set Activity Source
 * @param val activity source
 * @return {Object} action for SET_ACTIVITY_SRC
 */
export function setSrc(val) {
    return {
        type: SET_ACTIVITY_SRC,
        value: val
    };
}

/**
 * Action Creator to set Activity Destination
 * @param val destination
 * @return {Object} action for SET_ACTIVITY_DEST
 */
export function setDest(val) {
    return {
        type: SET_ACTIVITY_DEST,
        value: val
    };
}

/**
 * Action Creator to set Activity Type
 * @param val activity type
 * @return {Object} action for SET_ACTIVITY_TYPE
 */
export function setType(val) {
    return {
        type: SET_ACTIVITY_TYPE,
        value: val
    };
}

/**
 * Action Creator to set Activity Distance
 * @param val distance
 * @return {Object} action for SET_ACTIVITY_DISTANCE
 */
export function setDistance(val) {
    return {
        type: SET_ACTIVITY_DISTANCE,
        value: val
    };
}

/**
 * Action Creator to set Activity CO2 in kg
 * @param val co2 in kg
 * @return {Object} action for SET_ACTIVITY_CO2
 */
export function setCO2(val) {
    return {
        type: SET_ACTIVITY_CO2,
        value: val
    };
}
