import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

/**
 * Home Screens Login buttons
 * @param props properties from parent Class
 */
const LandingButtons = props => {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"
                    borderRadius={1}
                    iconStyle={styles.buttonIcon}
                    onPress={() => props.fbLogin()}
                >
                    <Text style={styles.buttonText}>
                        Continue with Facebook
                    </Text>
                </Icon.Button>
            </View>
            <View style={styles.button}>
                <Icon.Button
                    name="google"
                    backgroundColor="#dd4b39"
                    borderRadius={1}
                    iconStyle={styles.buttonIcon}
                >
                    <Text
                        style={styles.buttonText}
                        onPress={() => props.googleSignIn()}
                    >
                        Continue with Google
                    </Text>
                </Icon.Button>
            </View>
            <View style={styles.button}>
                <Icon.Button
                    name="twitter"
                    backgroundColor="#4099ff"
                    borderRadius={1}
                    iconStyle={styles.buttonIcon}
                >
                    <Text
                        style={styles.buttonText}
                        onPress={() => props.twitterLogin()}
                    >
                        Continue with Twitter
                    </Text>
                </Icon.Button>
            </View>
            <View style={styles.local}>
                <Icon.Button
                    backgroundColor="#fff"
                    borderRadius={1}
                    borderColor="#bbb"
                    borderWidth={1}
                    iconStyle={styles.localButton}
                    onPress={() => {
                        Actions.login();
                    }}
                >
                    <Text style={styles.login}>Sign In</Text>
                </Icon.Button>
                <Icon.Button
                    backgroundColor="#fff"
                    borderRadius={1}
                    borderColor="#bbb"
                    borderWidth={1}
                    iconStyle={styles.localButton}
                    onPress={() => Actions.register()}
                >
                    <Text style={styles.login}>Sign Up</Text>
                </Icon.Button>
            </View>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 20
    },
    button: {
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.8
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        flex: 1
    },
    buttonIcon: {
        marginLeft: 10,
        marginRight: 0
    },
    local: {
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    localButton: {
        marginRight: 0
    },
    login: {
        color: '#006400',
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.3
    }
});

export default LandingButtons;
