import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { getIcon, newColors } from '../config/helper';

/**
 * LoginForm component
 * @extends Component
 */
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            error: props.auth.error
        });
    }

    handleInput = (key, text) => {
        this.setState({
            [key]: text
        });
    };

    render() {
        var signupFields = [
            {
                name: 'email',
                placeholder: 'johndoe@gmail.com'
            },
            {
                name: 'password',
                placeholder: 'Enter your password'
            }
        ];

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={styles.inputForm}>
                    {signupFields.map(el => {
                        return (
                            <View style={styles.input} key={el.name}>
                                <TextInput
                                    placeholder={el.placeholder}
                                    style={styles.field}
                                    autoCapitalize="none"
                                    onChangeText={text => this.handleInput(el.name, text)}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        );
                    })}
                    <Text style={styles.forgotText} onPress={() => Actions.forgot()}>
                        Forgot Password?
                    </Text>

                    {this.props.auth.isFetching ? null : this.state.error ? (
                        <View style={styles.topMargin}>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    ) : null}
                    <TouchableHighlight
                        onPress={() =>
                            this.props.auth.isFetching
                                ? {}
                                : this.props.login(this.state.email, this.state.password)
                        }
                        style={styles.button}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.loginText}>
                            {this.props.auth.isFetching ? 'Logging....' : 'Login'}
                        </Text>
                    </TouchableHighlight>
                    {this.props.auth.isFetching ? (
                        <View style={styles.topMargin}>
                            <ActivityIndicator
                                animating={this.props.auth.isFetching}
                                color="#4D72B8"
                            />
                        </View>
                    ) : null}
                </KeyboardAwareScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Don't have an account?</Text>
                    <View style={styles.reg}>
                        <Text
                            onPress={() => Actions.register()}
                            style={[styles.registerText, styles.bottomText]}
                        >
                            Register Now
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    inputForm: {
        flex: 1,
        width: Dimensions.get('window').width * 0.9
    },
    input: {
        backgroundColor: 'rgba(191,191,191,0.2)',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputTop: {
        borderTopWidth: 0
    },
    field: {
        height: 40,
        color: 'rgba(157,157,157,1)',
        fontSize: 15,
        flex: 1,
        fontFamily: 'Muli-Regular',
        marginLeft: 8,
        color: newColors.black
    },
    button: {
        backgroundColor: newColors.secondary,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 21,
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 2
    },
    forgotText: {
        textAlign: 'right',
        color: newColors.secondary,
        fontFamily: 'Poppins-Regular'
    },
    loginText: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        borderRadius: 2,
        letterSpacing: 1
    },
    error: {
        color: '#cc0000'
    },
    topMargin: {
        marginTop: 10
    },
    registerText: {
        color: 'white'
    },
    reg: {
        backgroundColor: newColors.secondary,
        borderRadius: 20,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 7,
        paddingRight: 7,
        marginLeft: 3
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        fontFamily: 'Poppins-Regular'
    }
});

LoginForm.propTypes = {
    auth: PropTypes.object.isRequired
};

export default LoginForm;
