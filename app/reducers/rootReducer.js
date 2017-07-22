import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import activity from './activity';
import location from './location';
import direction from './direction';

const rootReducer = combineReducers({
    storage,
    route,
    login,
    activity
    location,
    direction,
});

export default rootReducer;
