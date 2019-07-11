import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    StatusBar,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import StatusBarBackground from '../components/StatusBarBackground';

import BackHeader from '../components/BackHeader';
import LoginForm from '../components/LoginForm';

import { RESET_PASSWORD } from '../config/constants';

import * as AuthAction from '../actions/AuthAction';
import { color, getIcon, newColors } from '../config/helper';

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            email: ''
        };
    }

    onButtonPress = () => {
        if (!this.props.forgot.isFetching) {
            this.props.forgotPassword(this.state.email);
            if (this.props.forgot.message == RESET_PASSWORD) {
                Actions.email_sent({ email: this.state.email });
            }
        }
    };

    render() {
        let style = {
            backgroundColor: '#fff'
        };
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <StatusBarBackground style={style} />
                <BackHeader text="Register" link={() => Actions.register()} icon toIcon="user" />
                <View style={styles.main}>
                    <View style={styles.registerWrapper}>
                        <Text style={styles.registerText}>Reset Password</Text>
                    </View>
                    <KeyboardAwareScrollView
                        style={styles.inputForm}
                        contentContainerStyle={styles.inputFormContainer}
                    >
                        <View style={styles.input}>
                            <Text style={styles.label}>EMAIL</Text>
                            <TextInput
                                placeholder="johndoe@gmail.com"
                                style={styles.field}
                                onChangeText={text => {
                                    this.setState({ email: text });
                                }}
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        {/* <Icon name={getIcon('mail')} size={18} color="#666" />
                            <TextInput
                                placeholder="Enter your email"
                                style={styles.field}
                                autoCapitalize="none"
                                onChangeText={text =>
                                    this.setState({
                                        email: text
                                    })
                                }
                                underlineColorAndroid="transparent"
                            /> */}
                        <View style={styles.buttonWrapper}>
                            <TouchableHighlight
                                onPress={() =>
                                    this.props.forgot.isFetching
                                        ? {}
                                        : this.props.forgotPassword(this.state.email)
                                }
                                style={styles.button}
                                underlayColor="#538124"
                                activeOpacity={0.5}
                            >
                                <Text style={styles.passwordResetText}>
                                    {this.props.forgot.isFetching
                                        ? 'Resetting....'
                                        : 'Reset Password'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        {this.props.forgot.isFetching ? null : this.props.forgot.message ? (
                            <View style={styles.topMargin}>
                                <Text style={styles.error}>{this.props.forgot.message}</Text>
                            </View>
                        ) : null}
                        {this.props.forgot.isFetching ? (
                            <View style={styles.topMargin}>
                                <ActivityIndicator
                                    animating={this.props.forgot.isFetching}
                                    color="#4D72B8"
                                />
                            </View>
                        ) : null}
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    registerWrapper: {
        width: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginBottom: 50
    },
    label: {
        color: 'white'
    },
    registerText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: newColors.black
    },
    field: {
        height: 40,
        color: '#555',
        fontSize: 15,
        flex: 1,
        marginLeft: 8
    },
    inputForm: {
        flex: 1,

        width: Dimensions.get('window').width * 0.9
    },
    input: {
        backgroundColor: newColors.lightPrimary,
        borderRadius: 5,
        alignItems: 'flex-start',
        color: 'white',
        marginTop: 30,
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 5
    },
    field: {
        height: 40,
        color: 'white',
        fontSize: 15,
        flex: 1,
        marginLeft: -3
    },
    button: {
        backgroundColor: newColors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        width: '50%'
    },
    buttonWrapper: {
        alignItems: 'center'
    },
    passwordResetText: {
        color: '#fff',
        fontSize: 20,
        // letterSpacing: 1,
        fontFamily: 'Poppins-Regular'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1
    },
    error: {
        color: '#cc0000'
    },
    topMargin: {
        marginTop: 10
    }
});

Forgot.propTypes = {
    forgot: PropTypes.object
};

function mapStateToProps(state) {
    return {
        forgot: state.forgot
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
)(Forgot);
