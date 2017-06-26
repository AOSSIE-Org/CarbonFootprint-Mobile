import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';

import ImageHeader from './ImageHeader';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageHeader text="" />
                    <View style={styles.input}>
                        <Kohana style={styles.box}
                            label={'Name'} iconClass={Icon} iconName={'user'}
                            iconColor={'#f4d29a'} labelStyle={styles.textColor}
                            inputStyle={styles.textColor} autoCapitalize='none'/>
                        <Kohana style={styles.box}
                            label={'Email'} iconClass={Icon} iconName={'envelope'}
                            iconColor={'#f4d29a'} labelStyle={styles.textColor}
                            inputStyle={styles.textColor} autoCapitalize='none'/>
                        <Kohana style={styles.box}
                             label={'Password'} iconClass={Icon} iconName={'lock'}
                             iconColor={'#f4d29a'} labelStyle={styles.textColor}
                             inputStyle={styles.textColor} secureTextEntry={true} autoCapitalize='none'/>
                        <Icon.Button backgroundColor="#66CC00" borderRadius={1}
                             borderWidth={1} iconStyle={styles.button}>
                             <Text style={styles.text} autoCapitalize='characters'>Sign Up</Text>
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
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    input: {
        flex: 1,
        width: Dimensions.get("window").width * 0.9,
        paddingBottom: Dimensions.get("window").width * 0.04,
    },
    box: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#f9f5ed',
    },
    textColor: {
        color: '#91627b',
        fontSize: 14
    },
    button: {
        marginRight: 0
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        letterSpacing: 2
    }

})

export default RegisterForm;
