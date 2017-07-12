import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import location from './location';
import direction from './direction';

const rootReducer = combineReducers({
    storage,
    route,
    login,
    location,
    direction,
});

export default rootReducer;
