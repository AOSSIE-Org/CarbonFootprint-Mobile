import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
import Router from './config/routes';

class CarbonFootprint extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CarbonFootprint;
