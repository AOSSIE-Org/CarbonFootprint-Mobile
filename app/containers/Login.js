import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackHeader from '../components/BackHeader';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    render() {
        return(
            <View style={styles.container}>
                <BackHeader text="Forgot Password?" link="Actions.forgotPass()"/>
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
    return bindActionCreators(Object.assign({}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
