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
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { getIcon, newColors } from '../config/helper.js';

/**
 * user Registration Component
 * @extends Component
 */
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            confirm_password: '',
            error: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            error: props.auth.error
        });
    }

    handleInput(element, text) {
        var key = element.key || element.text;
        this.setState({
            [key]: text
        });
    }

    render() {
        var { error, name, password, confirm_password, email } = this.state;

        var form = [
            {
                text: 'name',
                placeholder: 'John Doe'
            },
            {
                text: 'email',
                placeholder: 'johndoe@gmail.com'
            },
            {
                text: 'password',
                placeholder: 'Create a new password'
            },
            {
                text: 'confirm password',
                key: 'confirm_password',
                placeholder: 'Confirm your password'
            }
        ];

        const enableButtonStyle =
            !error && (name && password && confirm_password && email)
                ? styles.enableButtonStyle
                : null;

        return (
            <View style={styles.container}>
                <View style={styles.registerWrapper}>
                    <Text style={styles.registerText}>Register to Carbonfootprint</Text>
                </View>
                <KeyboardAwareScrollView style={styles.inputForm}>
                    <View style={styles.formWrapper}>
                        {form.map(element => {
                            var overrideStyles = element.key ? styles.override : {};
                            return (
                                <View style={[styles.input, overrideStyles]} key={element.text}>
                                    <Text style={styles.label}>{element.text.toUpperCase()}</Text>
                                    <TextInput
                                        placeholder={element.placeholder}
                                        style={styles.field}
                                        onChangeText={text => this.handleInput(element, text)}
                                        placeholderTextColor="rgba(255,255,255,0.5)"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            );
                        })}
                    </View>
                    {this.props.auth.isFetching ? null : this.state.error ? (
                        <View style={styles.topMargin}>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    ) : null}
                    <View style={styles.buttonWrapper}>
                        <TouchableHighlight
                            onPress={() =>
                                this.props.auth.isFetching
                                    ? {}
                                    : this.props.register(
                                          this.state.name,
                                          this.state.email,
                                          this.state.password
                                      )
                            }
                            style={[styles.button, enableButtonStyle]}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.registerButtonText}>
                                {this.props.auth.isFetching ? 'Registering....' : 'Register'}
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
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.termsWrapper}>
                    <Text style={styles.termsText}>
                        By registering you agree to{' '}
                        <Text style={styles.span}>Terms & Conditions</Text> and
                        <Text style={styles.span}> Privacy Policy</Text> of the Carbonfootprint.
                    </Text>
                </View>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
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
    inputForm: {
        flex: 1,
        width: Dimensions.get('window').width * 0.9
    },
    buttonWrapper: {
        alignItems: 'center'
    },
    registerText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: newColors.black
    },
    formWrapper: {
        backgroundColor: newColors.lightPrimary,
        borderRadius: 5
    },
    label: {
        color: 'white'
        // fontFamily: 'Poppins-Regular'
    },
    enableButtonStyle: {
        backgroundColor: newColors.secondary
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        alignItems: 'flex-start',
        color: 'white',
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 5
    },
    inputTop: {
        borderTopWidth: 0
    },
    field: {
        height: 40,
        color: 'white',
        fontSize: 15,
        flex: 1,
        marginLeft: -3
    },
    override: {
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: '#D7D7D7',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        width: '50%'
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 20,
        // letterSpacing: 1,
        fontFamily: 'Poppins-Regular'
    },
    error: {
        color: '#cc0000',
        fontSize: 12
    },
    topMargin: {
        marginTop: 10
    },
    termsWrapper: {
        width: '80%',
        color: '#BFBFBF',
        marginBottom: 10
    },
    termsText: {
        textAlign: 'center',

        fontFamily: 'Muli-Regular'
    },
    span: {
        color: '#2191FB'
    }
});

RegisterForm.propTypes = {
    auth: PropTypes.object,
    register: PropTypes.func.isRequired
};

export default RegisterForm;
