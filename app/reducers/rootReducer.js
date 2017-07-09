import { combineReducers } from 'redux';
import storage from './storage';
import route from './route';
import login from './login';
import activity from './activity';

const rootReducer = combineReducers({
    storage,
    route,
    login,
    activity
});

export default rootReducer;
