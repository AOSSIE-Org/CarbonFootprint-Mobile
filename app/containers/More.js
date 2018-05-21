import React, { Component } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthAction from '../actions/AuthAction';

import Header from '../components/Header';
import { getIcon, color } from '../config/helper';

/**
 * More Screen container
 * @extends Component
 */
class More extends Component {
    logout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.props.logout()
                }
            ],
            { cancelable: true }
        );
    }

    render() {
        let groups = [
            [
                {
                    icon: 'settings',
                    text: 'Settings',
                    link: () => Actions.settings()
                },
                {
                    icon: 'history',
                    text: 'History',
                    link: () => Actions.timeline()
                }
            ],
            [
                {
                    icon: 'information-circle',
                    text: 'About Us',
                    link: () => Actions.about()
                },
                {
                    icon: 'clipboard',
                    text: 'Terms and Conditions',
                    link: () => Actions.terms()
                }
            ],
            [
                {
                    icon: 'log-out',
                    text: 'Logout',
                    link: () => this.logout()
                }
            ]
        ];
        return (
            <View style={styles.container}>
                <Header icon={false} text="More" />
                <View style={styles.main}>
                    {groups.map((group, index) => {
                        return (
                            <View style={styles.group} key={index}>
                                {group.map((item, i) => {
                                    return (
                                        <TouchableHighlight
                                            onPress={item.link}
                                            activeOpacity={0.5}
                                            underlayColor="#eee"
                                            key={i}
                                        >
                                            <View style={styles.button}>
                                                {item.icon === 'history' ? (
                                                    <Icon1
                                                        name={item.icon}
                                                        size={20}
                                                        style={styles.icon}
                                                        color={color.black}
                                                    />
                                                ) : (
                                                    <Icon
                                                        name={getIcon(
                                                            item.icon
                                                        )}
                                                        size={24}
                                                        style={styles.icon}
                                                        color={color.black}
                                                    />
                                                )}
                                                <Text style={styles.text}>
                                                    {item.text}
                                                </Text>
                                            </View>
                                        </TouchableHighlight>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}
/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: color.greyBack
    },
    main: {
        marginTop: 55, // 75-20
        width: Dimensions.get('window').width
    },
    group: {
        marginTop: 20,
        width: Dimensions.get('window').width
    },
    button: {
        flexDirection: 'row',
        paddingLeft: 13,
        alignItems: 'center',
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        height: 50
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontSize: 14,
        color: color.black,
        letterSpacing: 1
    }
});
/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return state;
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(More);
