import React, { useState } from 'react';
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
import { Actions, ActionConst } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StatusBarBackground from '../components/StatusBarBackground';

import BackHeader from '../components/BackHeader';

import { STRING_EMPTY } from '../config/constants';

import { forgotPassword } from '../config/actionDispatcher';
import { newColors } from '../config/helper';
import { receiveForgot } from '../actions/AuthAction';

const Forgot = props => {
    const [email, setEmail] = useState('');
    const [button, setButton] = useState({
        disableButton: true,
        enableButtonColor: newColors.disableGrey
    });
    const forgot = useSelector(state => state.forgot);
    const dispatch = useDispatch();

    useState(() => {
        dispatch(receiveForgot(''));
    }, [dispatch]);

    const handleInput = text => {
        setEmail(text);
        if (shouldEnable(text)) {
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

    const shouldEnable = text => {
        if (email.trim() !== STRING_EMPTY && text !== STRING_EMPTY) {
            return true;
        }
        return false;
    };

    const onButtonPress = () => {
        if (!forgot.isFetching) {
            dispatch(forgotPassword(email));
        }
    };

    let style = {
        backgroundColor: '#fff'
    };
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <StatusBarBackground style={style} />
            <BackHeader
                text="Register"
                link={() => Actions.register({ type: ActionConst.REPLACE })}
                icon
                toIcon="user"
            />
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
                            onChangeText={text => handleInput(text)}
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
                            disabled={button.disableButton}
                            onPress={onButtonPress}
                            style={[{ backgroundColor: button.enableButtonColor }, styles.button]}
                            underlayColor="#538124"
                            activeOpacity={0.5}
                        >
                            <Text style={styles.passwordResetText}>
                                {forgot.isFetching ? 'Resetting....' : 'Reset Password'}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    {forgot.isFetching ? null : forgot.message ? (
                        <View style={styles.topMargin}>
                            <Text style={styles.error}>{forgot.message}</Text>
                        </View>
                    ) : null}
                    {forgot.isFetching ? (
                        <View style={styles.topMargin}>
                            <ActivityIndicator animating={forgot.isFetching} color="#4D72B8" />
                        </View>
                    ) : null}
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

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

export default Forgot;
