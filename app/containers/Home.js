import React, { Component, cloneElement } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as FbLoginAction from '../actions/FbLoginAction';
import * as GoogleLoginAction from '../actions/GoogleLoginAction';
import * as TwitterLoginAction from '../actions/TwitterLoginAction';
import * as LoaderAction from '../actions/LoaderAction';

import ImageHeader from '../components/ImageHeader';
import LandingButtons from '../components/LandingButtons';
import Loader from '../components/Loader';

/**
 * Home Page Container
 * @extends Component
 */
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.props.loader.isLoading} />
                <StatusBar hidden={true} />
                <ImageHeader text="Carbon Footprint" />
                <LandingButtons {...this.props} />
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}

/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({}, FbLoginAction, GoogleLoginAction, TwitterLoginAction, LoaderAction),
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
