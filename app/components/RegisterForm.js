import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { getIcon } from '../config/helper.js';
import ImageHeader from './ImageHeader';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageHeader text="Create a New Account" />
                    <KeyboardAwareScrollView style={styles.inputForm}>
                        <View style={styles.input}>
                            <Icon name={getIcon("person")} size={18} color="#666" />
                            <TextInput placeholder="Name" style={styles.field}
                                onChangeText={(text) => this.setState({name: text})}
                                underlineColorAndroid='transparent' />
                        </View>
                        <View style={styles.input}>
                            <Icon name={getIcon("mail")} size={18} color="#666" />
                            <TextInput placeholder="Email" style={styles.field} autoCapitalize='none'
                                onChangeText={(text) => this.setState({email: text})}
                                underlineColorAndroid='transparent' />
                        </View>
                        <View style={[styles.input, styles.inputTop]}>
                            <Icon name={getIcon("lock")} size={18} color="#666" />
                            <TextInput placeholder="Password" style={styles.field} secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})} autoCapitalize='none'
                                underlineColorAndroid='transparent' />
                        </View>
                        <TouchableHighlight onPress={() =>
                            this.props.register(this.state.name, this.state.email, this.state.password)
                        } style={styles.button}>
                            <Text style={styles.text}>Register</Text>
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
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 21,
        borderRadius: 2,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
    }
})

export default RegisterForm;
