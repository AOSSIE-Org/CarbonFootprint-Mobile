import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    BackHandler,
    TouchableHighlight,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { getIcon, newColors } from '../config/helper';
import { STRING_EMPTY } from '../config/constants';

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
            error: '',
            backClickCount: 0,
            disableButton: true,
            enableButtonColor: newColors.disableGrey
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            error: props.auth.error
        });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if(this.state.backClickCount > 0) {
            BackHandler.exitApp();
        } else {
            this.setState({ backClickCount: 1 }, () => 
                ToastAndroid.show('Press again to exit', ToastAndroid.SHORT)
            );
            setTimeout(() => this.setState({ backClickCount: 0 }), 1000);
        }
        return true;
    }

    handleInput = (key, text) => {
        this.setState({
            [key]: text
        });
        
        if (this.shouldDisable(text)) {
          this.setState({
                disableButton: false,
                enableButtonColor: newColors.secondary
            })
        } else {
            this.setState({
                disableButton: true,
                enableButtonColor: newColors.disableGrey
            })
        }
    };

    forgotPassword = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        Actions.forgot();
    }

    registerNow = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        Actions.register();
    }

    shouldDisable = (text) => {
        const { email, password } = this.state;

        if (email.trim() !== STRING_EMPTY && password.trim() !== STRING_EMPTY && text !== STRING_EMPTY) {
            return true;
        }
        return false;
    }

    render() {
        let signupFields = [
            {
                name: 'email',
                placeholder: 'johndoe@gmail.com'
            },
            {
                name: 'password',
                placeholder: 'Enter your password',
                props: {
                    secureTextEntry: true
                }
            }
        ];

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={styles.inputForm}>
                    {signupFields.map(obj => {
                        return (
                            <View style={styles.input} key={obj.name}>
                                <TextInput
                                    placeholder={obj.placeholder}
                                    style={styles.field}
                                    autoCapitalize="none"
                                    onChangeText={text => this.handleInput(obj.name, text)}
                                    underlineColorAndroid="transparent"
                                    {...obj.props}
                                />
                            </View>
                        );
                    })}
                    <Text style={styles.forgotText} onPress={this.forgotPassword}>
                        Forgot Password?
                    </Text>

                    {this.props.auth.isFetching ? null : this.state.error ? (
                        <View style={styles.topMargin}>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    ) : null}
                    <TouchableHighlight
                        disabled={this.state.disableButton}
                        onPress={() =>
                            this.props.auth.isFetching
                                ? {}
                                : this.props.login(this.state.email, this.state.password)
                        }
                        style={[{ backgroundColor: this.state.enableButtonColor }, styles.button]}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.loginText}>
                            {this.props.auth.isFetching ? 'Logging....' : 'Login'}
                        </Text>
                    </TouchableHighlight>
                </KeyboardAwareScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Don't have an account?</Text>
                    <View style={styles.reg}>
                        <Text
                            onPress={this.registerNow}
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
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
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
