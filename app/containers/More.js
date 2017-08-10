import React, { Component } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthAction from '../actions/AuthAction';

import Header from '../components/Header';
import { getIcon } from '../config/helper';

class More extends Component {
    logout() {
        Alert.alert(
            'Are you sure you want to logout?',
            '',
            [
                {
                    text: 'Cancel', onPress: () => console.log('Wise Choice!!!'), style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => this.props.logout()
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        let groups = [
            [
                {
                    icon: "settings",
                    text: "Settings",
                    link: () => console.log("Settings"),
                },
                {
                    icon: "person",
                    text: "Profile",
                    link: () => Actions.profile(),
                }
            ],
            [
                {
                    icon: "information-circle",
                    text: "About Us",
                    link: () => Actions.about(),
                },
                {
                    icon: "clipboard",
                    text: "Terms and Conditions",
                    link: () => Actions.terms(),
                }
            ],
            [
                {
                    icon: "log-out",
                    text: "Logout",
                    link: () => this.logout(),
                }
            ]
        ];
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header icon={false} text="More" />
                <View style={styles.main}>
                    {
                        groups.map((group, index) => {
                            return (
                                <View style={styles.group} key={index}>
                                    {
                                        group.map((item, i) => {
                                            return (
                                                <TouchableHighlight onPress={item.link}
                                                    activeOpacity={0.5} underlayColor="#eee" key={i}>
                                                    <View style={styles.button}>
                                                        <Icon name={getIcon(item.icon)}
                                                            size={24} style={styles.icon} color="#444"/>
                                                        <Text style={styles.text}>{item.text}</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: "#f7f7f7",
    },
    main: {
        marginTop: 55, // (45 + 10)
        width: Dimensions.get("window").width,
    },
    group: {
        marginTop: 20,
        width: Dimensions.get("window").width,
    },
    button: {
        flexDirection: 'row',
        paddingLeft: 13,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#ddd',
        height: 50,
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontSize: 14,
        color: "#444",
        letterSpacing: 1,
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(More);
