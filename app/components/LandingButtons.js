import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newColors } from '../config/helper';
import LoginForm from './LoginForm';
import * as AuthAction from '../actions/AuthAction';

/**
 * Home Screens Login buttons
 * @param props properties from parent Class
 */
const LandingButtons = props => {
    const oauthList = [
        {
            name: 'facebook',
            onPress: props.fbLogin,
            style: styles.facebookButton
        },
        {
            name: 'google',
            onPress: props.googleSignIn,
            style: styles.googleButton
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.oauthWrapper}>
                {oauthList.map((obj, index) => {
                    return (
                        <View style={styles.button} key={index}>
                            <Icon.Button
                                name={obj.name}
                                backgroundColor="white"
                                iconStyle={[styles.buttonIcon, obj.style]}
                                onPress={obj.onPress}
                            >
                                <Text style={styles.buttonText}>
                                    {obj.name && obj.name.substr(0, 1).toUpperCase()}
                                    {obj.name && obj.name.substr(1)}
                                </Text>
                            </Icon.Button>
                        </View>
                    );
                })}
            </View>

            <View style={styles.or}>
                <View style={styles.line} />
                <Text style={styles.orText}>or sign in with email</Text>
            </View>

            <LoginForm {...props} />
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 20
    },
    oauthWrapper: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between'
    },
    or: {
        alignItems: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '80%',
        marginTop: 10
    },
    orText: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingRight: 10,
        paddingLeft: 10,
        fontFamily: 'Poppins-Regular',
        color: '#7A7A7A'
    },
    line: {
        position: 'absolute',
        height: 1,
        width: '100%',
        backgroundColor: '#7A7A7A',
        opacity: 0.2,
        top: '50%',
        alignSelf: 'flex-start'
    },
    button: {
        marginBottom: 10,
        // paddingTop: 5,
        // paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.4,
        borderColor: 'rgba(215,215,215,1)',
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        color: newColors.black,
        flex: 1,
        fontFamily: 'Poppins-Regular'
    },
    facebookButton: {
        color: '#3b5998'
    },
    googleButton: {
        color: '#EA4335'
    },
    buttonIcon: {
        marginLeft: 10
    }
});

LandingButtons.propTypes = {
    fbLogin: PropTypes.func.isRequired,
    googleSignIn: PropTypes.func.isRequired
};

/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingButtons);
