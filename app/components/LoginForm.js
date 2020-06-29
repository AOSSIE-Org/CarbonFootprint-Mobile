import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    BackHandler,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

import { newColors } from '../config/helper';
import { STRING_EMPTY } from '../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../config/actionDispatcher';
import { receiveError } from '../actions/AuthAction';

const LoginForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [button, setButton] = useState({
        disableButton: true,
        enableButtonColor: newColors.disableGrey
    });
    const [backClickCount, setBackclickCount] = useState(0);
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
        if (backClickCount > 0) {
            BackHandler.exitApp();
        } else {
            setBackclickCount(1);
            ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackclickCount(0), 1000);
        }
        return true;
    }, [backClickCount]);

    const handleInput = (key, text) => {
        if (key === 'email') {
            setEmail(text);
        } else {
            setPassword(text);
        }
        if (shouldDisable(text)) {
            setButton({
                disableButton: false,
                enableButtonColor: newColors.secondary
            });
        } else {
            setButton({
                disableButton: true,
                enableButtonColor: newColors.disableGrey
            });
        }
    };

    const forgotPassword = () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        Actions.forgot();
    };

    const shouldDisable = text => {
        if (
            email.trim() !== STRING_EMPTY &&
            password.trim() !== STRING_EMPTY &&
            text !== STRING_EMPTY
        ) {
            return true;
        }
        return false;
    };

    const userLogin = () => {
        auth.isFetching ? {} : dispatch(login(email, password));
    };

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
                                onChangeText={text => handleInput(obj.name, text)}
                                underlineColorAndroid="transparent"
                                {...obj.props}
                            />
                        </View>
                    );
                })}
                <Text style={styles.forgotText} onPress={forgotPassword}>
                    Forgot Password?
                </Text>
                {auth.isFetching ? null : error ? (
                    <View style={styles.topMargin}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                ) : null}
                <TouchableHighlight
                    disabled={button.disableButton}
                    onPress={userLogin}
                    style={[{ backgroundColor: button.enableButtonColor }, styles.button]}
                    activeOpacity={0.5}
                >
                    <Text style={styles.loginText}>
                        {auth.isFetching ? 'Logging....' : 'Login'}
                    </Text>
                </TouchableHighlight>
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
};

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
        marginLeft: 8
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

export default React.memo(LoginForm);
