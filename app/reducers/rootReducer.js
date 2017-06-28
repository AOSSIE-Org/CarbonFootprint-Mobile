import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';

const rootReducer = combineReducers({
    storage,
    route,
    login
});

export default rootReducer;
