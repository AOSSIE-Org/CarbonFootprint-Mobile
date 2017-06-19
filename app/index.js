import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './config/store';
import Router from './config/routes';


class CarbonFootprint extends Component {
    componentDidMount() {
        console.log("Starting Splash Screen");
        SplashScreen.hide();
        console.log("Ending Splash Screen");
    }

    render() {
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default CarbonFootprint;
