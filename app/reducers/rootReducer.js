import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import location from './location';

const rootReducer = combineReducers({
    storage,
    route,
    login,
    location
});

export default rootReducer;
