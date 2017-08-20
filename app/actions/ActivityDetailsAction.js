export const SET_ACTIVITY_DATE = "SET_ACTIVITY_DATE";
export const SET_ACTIVITY_START_TIME = "SET_ACTIVITY_START_TIME";
export const SET_ACTIVITY_DURATION = "SET_ACTIVITY_DURATION";
export const SET_ACTIVITY_SRC = "SET_ACTIVITY_SRC";
export const SET_ACTIVITY_DEST = "SET_ACTIVITY_DEST";
export const SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE";
export const SET_ACTIVITY_DISTANCE = "SET_ACTIVITY_DISTANCE";
export const SET_ACTIVITY_CO2 = "SET_ACTIVITY_CO2";

export function setDate(val) {
  return {
    type: SET_ACTIVITY_DATE,
    value: val
  }
}

export function setStartTime(val) {
  return {
    type: SET_ACTIVITY_START_TIME,
    value: val
  }
}

export function setDuration(val) {
  return {
    type: SET_ACTIVITY_DURATION,
    value: val
  }
}

export function setSrc(val) {
  return {
    type: SET_ACTIVITY_SRC,
    value: val
  }
}

export function setDest(val) {
  return {
    type: SET_ACTIVITY_DEST,
    value: val
  }
}

export function setType(val) {
  return {
    type: SET_ACTIVITY_TYPE,
    value: val
  }
}

export function setDistance(val) {
  return {
    type: SET_ACTIVITY_DISTANCE,
    value: val
  }
}

export function setCO2(val) {
  return {
    type: SET_ACTIVITY_CO2,
    value: val
  }
}