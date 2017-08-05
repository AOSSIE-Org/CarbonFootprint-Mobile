import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions, ActionConst } from 'react-native-router-flux';
import ImageHeader from './ImageHeader';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageHeader text="" />
                <KeyboardAwareScrollView style={styles.inputForm}>
                    <View style={styles.input}>
                        <Icon name="envelope" size={16} color="#666" />
                        <TextInput placeholder="Email" style={styles.field} autoCapitalize='none'
                            onChangeText={(text) => this.setState({email: text})}
                            underlineColorAndroid='transparent'/>
                    </View>
                    <View style={[styles.input, styles.inputTop]}>
                        <Icon name="lock" size={18} color="#666" />
                        <TextInput placeholder="Password" style={styles.field} secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})} autoCapitalize='none'
                            underlineColorAndroid='transparent'/>
                    </View>
                    <TouchableHighlight onPress={() => {
                            Actions.main({type: ActionConst.RESET});
                            Actions.calculate()
                        }} style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableHighlight>
                </KeyboardAwareScrollView>
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
    inputForm: {
        flex: 1,
        width: Dimensions.get("window").width * 0.9,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#555",
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputTop: {
        borderTopWidth: 0,
    },
    field: {
        height: 40,
        color: '#555',
        fontSize: 15,
        flex: 1,
        marginLeft: 8,
    },
    button: {
        backgroundColor: "#538124",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        borderRadius: 2,
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
})

export default LoginForm;
