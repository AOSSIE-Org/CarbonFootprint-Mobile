import { SET_ACTIVITY_TYPE } from '../actions/ActivityDetectionAction';

export default function activity(state = {
	activityType: 'STILL'
}, action) {
	switch(action.type) {
		case SET_ACTIVITY_TYPE:
			//alert("Storing activity: " + action.activityType);
			return Object.assign({}, state, {
                activityType: action.activityType
            });
        default:
            return state;
	}
}