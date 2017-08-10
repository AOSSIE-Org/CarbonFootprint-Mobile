import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon } from '../config/helper.js';

class Footer extends Component {
    render() {
        const size = 20;
        const active = "#538124";
        const normal = "#555";
        const underlay = "#fff";
        const color = {
            calculate: this.props.name === 'calculate' ?
                        active: normal,
            activity: this.props.name === 'activity' ?
                        active: normal,
            friends: this.props.name === 'friends' ?
                        active: normal,
            more: this.props.name === 'more' ?
                        active: normal,
            profile: this.props.name === 'profile'?
                        active: normal
        }

        const tabs = [
            {
                action: () => Actions.calculate(),
                icon: "pin",
                color: color.calculate,
                name: "Calculate",
            },
            {
                action: () => Actions.activity(),
                icon: "pulse",
                color: color.activity,
                name: "Activity",
            },
            {
                action: () => {},
                icon: "people",
                color: color.friends,
                name: "Friends",
            },
            {
                action: () => Actions.profile(),
                icon: "person",
                color: color.profile,
                name: "Profile",
            },
            {
                action: () => Actions.more(),
                icon: "more",
                color: color.more,
                name: "More",
            }
        ]

        return(
            <View style={styles.container}>
                {
                    tabs.map((tab, index) => {
                        return (
                            <TouchableHighlight style={styles.touch} onPress={tab.action}
                                underlayColor={underlay} activeOpacity={0.5} key={tab.name}>
                                <View style={styles.nav}>
                                    <Icon name={getIcon(tab.icon)} size={size}
                                        color={tab.color} style={styles.icon}/>
                                    <Text style={[styles.text, {color: tab.color}]}>
                                        {tab.name}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 0,
        width: Dimensions.get("window").width,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#ddd',
        zIndex: 3,
        position: 'absolute',
        height: 45,
    },
    nav: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        fontSize: 10,
        letterSpacing: 1,
    },
    touch: {
        paddingLeft: 5,
        paddingRight: 5,
    }
})

export default Footer;
