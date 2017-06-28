import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import BackHeader from '../components/BackHeader';
import RegisterForm from '../components/RegisterForm';

class Register extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <BackHeader text="Login" link={() => Actions.login()}/>
                <RegisterForm {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
