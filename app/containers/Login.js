import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackHeader from '../components/BackHeader';
import LoginForm from '../components/LoginForm';

import * as SimpleAction from '../actions/SimpleAction';

class Login extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <BackHeader text="Forgot Password?" link={() => Actions.forgotPass()}/>
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
    return bindActionCreators(Object.assign({}, SimpleAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
