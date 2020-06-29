import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { newColors } from '../config/helper';
import LoginForm from './LoginForm';
import { fbLogin, googleSignIn } from '../config/actionDispatcher';
import { useDispatch } from 'react-redux';

/**
 * Home Screens Login buttons
 * @param props properties from parent Class
 */
const LandingButtons = props => {
    const dispatch = useDispatch();

    const oauthList = [
        {
            name: 'facebook',
            onPress: () => dispatch(fbLogin()),
            style: styles.facebookButton
        },
        {
            name: 'google',
            onPress: () => dispatch(googleSignIn()),
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

export default React.memo(LandingButtons);
