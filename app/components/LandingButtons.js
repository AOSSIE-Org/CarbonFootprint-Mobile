import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {firebaseConfig, twitterSignInConfig,googleSignInConfig} from '../config/keys'


class LandingButtons extends Component {
    constructor(props) {
        super(props);
    }

    checkKeys(id) {
       if (id === 2) {
           if(googleSignInConfig.clientID === null) {
               return ToastAndroid.show("Keys are not set, hence this functionality is disabled", ToastAndroid.SHORT)
           } else {
               this.props.googleSignIn()
           }
       } else if (id === 3) {
           if(twitterSignInConfig.twitter_key === null) {
            return ToastAndroid.show("Keys are not set, hence this functionality is disabled", ToastAndroid.SHORT)
           } else {
               this.props.twitterLogin()
           }
       } else {
           this.props.fbLogin()
       }
    }
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.button}>
                    <Icon.Button name="facebook" backgroundColor="#3b5998" borderRadius={1}
                        iconStyle={styles.buttonIcon} onPress={() => this.checkKeys(1)}>
                        <Text style={styles.buttonText}>Continue with Facebook</Text>
                    </Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name="google" backgroundColor="#dd4b39" borderRadius={1}
                        iconStyle={styles.buttonIcon}>
                        <Text style={styles.buttonText} onPress={() => this.checkKeys(2)}>Continue with Google</Text>
                    </Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name="twitter" backgroundColor="#4099ff" borderRadius={1}
                        iconStyle={styles.buttonIcon}>
                        <Text style={styles.buttonText} onPress={() => this.checkKeys(3)}>Continue with Twitter</Text>
                    </Icon.Button>
                </View>
                <View style={styles.local}>
                    <Icon.Button backgroundColor="#fff" borderRadius={1}
                        borderColor="#bbb" borderWidth={1} iconStyle={styles.localButton}
                        onPress={() => {Actions.login()}}>
                        <Text style={styles.login}>Sign In</Text>
                    </Icon.Button>
                    <Icon.Button backgroundColor="#fff" borderRadius={1}
                        borderColor="#bbb" borderWidth={1} iconStyle={styles.localButton}
                        onPress={() => Actions.register()}>
                        <Text style={styles.login}>Sign Up</Text>
                    </Icon.Button>
                </View>

            </View>
        )
    }
}

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
        width: Dimensions.get("window").width * 0.8
    },
    buttonText: {
        textAlign: 'center',
        color: "#fff",
        flex: 1
    },
    buttonIcon: {
        marginLeft: 10,
        marginRight: 0
    },
    local: {
        width: Dimensions.get("window").width * 0.8,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    localButton: {
        marginRight: 0
    },
    login: {
        color: '#006400',
        textAlign: 'center',
        width: Dimensions.get("window").width * 0.3
    }
})

export default LandingButtons;
