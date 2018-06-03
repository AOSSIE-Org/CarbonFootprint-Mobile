import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import BackHeader from '../components/BackHeader';
import RegisterForm from '../components/RegisterForm';

import * as AuthAction from '../actions/AuthAction';

/**
 * Register Screen Container
 * @extends Component
 */
class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <BackHeader text="Login" link={() => Actions.login()} />
                <RegisterForm {...this.props} />
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
    return { auth: state.auth };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
