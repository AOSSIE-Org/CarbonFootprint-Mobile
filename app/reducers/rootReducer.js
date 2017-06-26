import { combineReducers } from 'redux';
import storage from './storage';
import storageReducer from './storageReducer';
import route from './route';
import login from './login';

const rootReducer = combineReducers({
    storage,
    storageReducer,
    route,
    login
});

export default rootReducer;
