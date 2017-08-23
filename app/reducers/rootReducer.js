import { combineReducers } from 'redux';

import storage from './storage';
import route from './route';
import auth from './auth';
import activity from './activity';
import location from './location';
import direction from './direction';
import friends from './friends';
import forgot from './forgot';

const appReducer = combineReducers({
    storage,
    route,
    auth,
    activity,
    location,
    direction,
    friends,
    forgot
});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;
