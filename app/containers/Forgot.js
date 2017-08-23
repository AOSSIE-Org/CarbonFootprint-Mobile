import React, { Component } from 'react';
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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import BackHeader from '../components/BackHeader';
import LoginForm from '../components/LoginForm';
import ImageHeader from '../components/ImageHeader';

import * as AuthAction from '../actions/AuthAction';
import { color, getIcon } from '../config/helper';

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <BackHeader text="Register" link={() => Actions.register()}/>
                <View style={styles.main}>
                    <ImageHeader text="Forgot Your Password" />
                    <KeyboardAwareScrollView style={styles.inputForm}>
                        <View style={styles.input}>
                            <Icon name={getIcon("mail")} size={18} color="#666" />
                            <TextInput placeholder="Enter your email" style={styles.field} autoCapitalize='none'
                                onChangeText={(text) => this.setState({email: text})}
                                underlineColorAndroid='transparent'/>
                        </View>
                        <TouchableHighlight onPress={() =>
                                this.props.forgot.isFetching ?
                                {}:
                                this.props.forgotPassword(this.state.email)
                            } style={styles.button} underlayColor="#538124" activeOpacity={0.5}>
                            <Text style={styles.text}>
                                {
                                    this.props.forgot.isFetching ?
                                    "Resetting....":
                                    "Reset Password"
                                }
                            </Text>
                        </TouchableHighlight>
                        {
                            this.props.forgot.isFetching ?
                            null:
                            this.props.forgot.message ?
                            <View style={styles.topMargin}>
                                <Text style={styles.error}>{this.props.forgot.message}</Text>
                            </View>
                            : null
                        }
                        {
                            this.props.forgot.isFetching ?
                            <View style={styles.topMargin}>
                                <ActivityIndicator animating={this.props.forgot.isFetching} color="#4D72B8"/>
                            </View>
                            : null
                        }
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    field: {
        height: 40,
        color: '#555',
        fontSize: 15,
        flex: 1,
        marginLeft: 8,
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
    },
    error: {
        color: '#cc0000',
    },
    topMargin: {
        marginTop: 10,
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
