import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

/**
 * creating store for application
 */
let middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, thunk, logger];
} else {
    middleware = [...middleware, thunk];
}

const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

export default store;
