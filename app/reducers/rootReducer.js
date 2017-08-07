import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import activity from './activity';
import location from './location';
import direction from './direction';

const appReducer = combineReducers({
    storage,
    route,
    login,
    activity,
    location,
    direction
});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;
