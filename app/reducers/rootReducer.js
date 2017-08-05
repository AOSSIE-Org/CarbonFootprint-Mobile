import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import location from './location';
import direction from './direction';

const appReducer = combineReducers({
    storage,
    route,
    login,
    location,
    direction,
});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;
