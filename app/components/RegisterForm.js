import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    BackHandler,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { newColors } from '../config/helper.js';
import { STRING_EMPTY } from '../config/constants.js';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../config/actionDispatcher';
import { receiveError } from '../actions/AuthAction';

const RegisterForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [button, setButton] = useState({
        buttonDisabled: true,
        buttonEnableColor: newColors.disableGrey
    });
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveError(''));
    }, [dispatch]);

    useEffect(() => {
        setError(auth.error);
    }, [auth.error]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [handleBackPress]);

    const handleBackPress = useCallback(() => {
        Actions.pop();
        return true;
    }, []);

    const handleInput = (element, text) => {
        let key = element.key || element.text;
        if (key === 'email') {
            setEmail(text);
        } else if (key === 'password') {
            setPassword(text);
        } else if (key === 'name') {
            setName(text);
        } else {
            setConfirmPassword(text);
        }

        if (shouldDisable(text)) {
            setButton({
                buttonDisabled: false,
                buttonEnableColor: newColors.secondary
            });
        } else {
            setButton({
                buttonDisabled: true,
                buttonEnableColor: newColors.disableGrey
            });
        }
    };

    const shouldDisable = text => {
        if (
            name.trim() !== STRING_EMPTY &&
            password.trim() !== STRING_EMPTY &&
            confirmPassword.trim() !== STRING_EMPTY &&
            email.trim() !== STRING_EMPTY &&
            text !== STRING_EMPTY
        ) {
            return true;
        }
    };

    const userRegister = () => {
        auth.isFetching
            ? {}
            : confirmPassword === password
            ? dispatch(register(name, email, password))
            : setError("Password and confirm password don't match.");
    };

    const showError = () => {
        if (error) {
            return (
                <View style={styles.topMargin}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            );
        }
    };

    const form = [
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
            placeholder: 'Create a new password',
            props: {
                secureTextEntry: true
            }
        },
        {
            text: 'confirm password',
            key: 'confirmPassword',
            placeholder: 'Confirm your password',
            props: {
                secureTextEntry: true
            }
        }
    ];
    return (
        <View style={styles.container}>
            <View style={styles.registerWrapper}>
                <Text style={styles.registerText}>Register to Carbonfootprint</Text>
            </View>
            <KeyboardAwareScrollView style={styles.inputForm}>
                <View style={styles.formWrapper}>
                    {form.map(element => {
                        let overrideStyles = element.key ? styles.override : {};
                        return (
                            <View style={[styles.input, overrideStyles]} key={element.text}>
                                <Text style={styles.label}>{element.text.toUpperCase()}</Text>
                                <TextInput
                                    placeholder={element.placeholder}
                                    style={styles.field}
                                    onChangeText={text => handleInput(element, text)}
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    underlineColorAndroid="transparent"
                                    {...element.props}
                                />
                            </View>
                        );
                    })}
                </View>
                {auth.isFetching ? null : showError()}
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        disabled={button.buttonDisabled}
                        onPress={userRegister}
                        style={[{ backgroundColor: button.buttonEnableColor }, styles.button]}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.registerButtonText}>
                            {auth.isFetching ? 'Registering....' : 'Register'}
                        </Text>
                    </TouchableHighlight>
                    {auth.isFetching ? (
                        <View style={styles.topMargin}>
                            <ActivityIndicator animating={auth.isFetching} color="#4D72B8" />
                        </View>
                    ) : null}
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.termsWrapper}>
                <Text style={styles.termsText}>
                    By registering you agree to <Text style={styles.span}>Terms & Conditions</Text>{' '}
                    and
                    <Text style={styles.span}> Privacy Policy</Text> of the Carbonfootprint.
                </Text>
            </View>
        </View>
    );
};

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
        flex: 1
        // marginLeft: -3
    },
    override: {
        borderBottomWidth: 0
    },
    button: {
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

export default RegisterForm;
