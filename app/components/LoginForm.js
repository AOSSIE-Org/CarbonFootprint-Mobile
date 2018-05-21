import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { getIcon } from '../config/helper';
import ImageHeader from './ImageHeader';

/**
 * LoginForm component
 * @extends Component
 */
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            error: props.auth.error
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageHeader text="" />
                <KeyboardAwareScrollView style={styles.inputForm}>
                    <View style={styles.input}>
                        <Icon name={getIcon('mail')} size={18} color="#666" />
                        <TextInput
                            placeholder="Email"
                            style={styles.field}
                            autoCapitalize="none"
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={[styles.input, styles.inputTop]}>
                        <Icon name={getIcon('lock')} size={18} color="#666" />
                        <TextInput
                            placeholder="Password"
                            style={styles.field}
                            secureTextEntry={true}
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    {this.props.auth.isFetching ? null : this.state.error ? (
                        <View style={styles.topMargin}>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    ) : null}
                    <TouchableHighlight
                        onPress={() =>
                            this.props.auth.isFetching
                                ? {}
                                : this.props.login(
                                      this.state.email,
                                      this.state.password
                                  )
                        }
                        style={styles.button}
                        underlayColor="#538124"
                        activeOpacity={0.5}
                    >
                        <Text style={styles.text}>
                            {this.props.auth.isFetching
                                ? 'Logging....'
                                : 'Login'}
                        </Text>
                    </TouchableHighlight>
                    {this.props.auth.isFetching ? (
                        <View style={styles.topMargin}>
                            <ActivityIndicator
                                animating={this.props.auth.isFetching}
                                color="#4D72B8"
                            />
                        </View>
                    ) : null}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    inputForm: {
        flex: 1,
        width: Dimensions.get('window').width * 0.9
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#555',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputTop: {
        borderTopWidth: 0
    },
    field: {
        height: 40,
        color: '#555',
        fontSize: 15,
        flex: 1,
        marginLeft: 8
    },
    button: {
        backgroundColor: '#538124',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 21,
        borderRadius: 2
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

export default LoginForm;
