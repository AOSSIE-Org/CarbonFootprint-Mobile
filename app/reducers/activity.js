import {    
    SET_ACTIVITY_DATE, 
    SET_ACTIVITY_START_TIME,
    SET_ACTIVITY_DURATION,
    SET_ACTIVITY_SRC,
    SET_ACTIVITY_DEST,
    SET_ACTIVITY_TYPE,
    SET_ACTIVITY_DISTANCE,
    SET_ACTIVITY_CO2
} from '../actions/ActivityDetailsAction';
import { formatAMPM } from '../config/helper';

export default function activity(state = {
	date: new Date().toDateString(),
	startTime: formatAMPM(new Date()),
	duration: 0,
	src: {},
	dest: {},
	type: 'STILL',
	distance: 0,
	co2: 0
}, action) {
	switch(action.type) {
		case SET_ACTIVITY_DATE:
			return Object.assign({}, state, {
                date: action.value
            });
		case SET_ACTIVITY_START_TIME:
			return Object.assign({}, state, {
                startTime: action.value
            });
        case SET_ACTIVITY_DURATION:
			return Object.assign({}, state, {
                duration: action.value
            });
        case SET_ACTIVITY_SRC:
			return Object.assign({}, state, {
                src: action.value
            });
        case SET_ACTIVITY_DEST:
			return Object.assign({}, state, {
                dest: action.value
            });
        case SET_ACTIVITY_TYPE:
			return Object.assign({}, state, {
                type: action.value
            });
        case SET_ACTIVITY_DISTANCE:
			return Object.assign({}, state, {
                distance: action.value
            });
        case SET_ACTIVITY_CO2:
			return Object.assign({}, state, {
                co2: action.value
            });                    	
        default:
            return state;
	}
}