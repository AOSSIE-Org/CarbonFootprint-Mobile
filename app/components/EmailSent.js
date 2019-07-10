import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { newColors } from '../config/helper';
import { Actions } from 'react-native-router-flux';
import images from '../config/images';

function PressHandler(email) {}

export default function EmailSent(props) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.firstView}>
                <Image source={images.mail} style={styles.image} />
                <View>
                    <Text style={styles.title}>Check your Email</Text>
                    <Text style={styles.desc}>
                        We have sent you a reset password link on your registered email address{' '}
                        <Text style={styles.emailText}>({props.email})</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => PressHandler(props.email)}
                    style={styles.emailButton}
                >
                    <Text style={styles.emailButtonText}>Open Email App</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.secondView}>
                <TouchableOpacity
                    onPress={() => Actions.register()}
                    style={[styles.basicButton, styles.signupButton]}
                >
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Actions.home()}
                    style={[styles.basicButton, styles.signinButton]}
                >
                    <Text style={styles.signinText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {},
    wrapper: {
        flex: 1
    },
    secondView: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    emailText: {
        fontWeight: 'bold'
    },
    firstView: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: newColors.black,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    desc: {
        width: '10%',
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.7,
        color: '#9D9D9D',
        marginBottom: 15,
        fontFamily: 'Poppins-Regular'
    },
    emailButton: {
        backgroundColor: newColors.secondary,
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 5
    },
    basicButton: {
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 5
    },
    signinButton: {
        backgroundColor: newColors.secondary
    },
    signupButton: {
        borderWidth: 1,
        borderColor: newColors.secondary,
        fontFamily: 'Poppins-Regular'
    },
    signinText: {
        color: 'white',
        fontFamily: 'Poppins-Regular'
    },
    signupText: {
        color: newColors.secondary,
        fontFamily: 'Poppins-Regular'
    },
    emailButtonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold'
    }
});
