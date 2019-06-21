import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './config/store';
import Navigator from './config/routes';
import { View, Text, StyleSheet } from 'react-native';

class CarbonFootprint extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: 'white'
    }
});

export default CarbonFootprint;
