import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './config/store';
import Navigator from './config/routes';

class CarbonFootprint extends Component {
    render() {
        return(
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}

export default CarbonFootprint;
