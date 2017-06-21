import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
import Router from './config/routes';

class CarbonFootprint extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default CarbonFootprint;