import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackHeader from '../components/BackHeader';
import LoginForm from '../components/LoginForm';

import * as AuthAction from '../actions/AuthAction';

class Login extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <BackHeader text="Forgot Password?" link={() => Actions.forgot()}/>
                <LoginForm {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
