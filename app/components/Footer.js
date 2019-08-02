import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { getIcon, color } from '../config/helper.js';
import OfflineNotice from './OfflineNotice';

/**
 * footer component
 * @param  props properties sent from parent component
 */
const Footer = props => {
    const size = 20;
    const footerColor = {
        calculate: props.name === 'calculate' ? color.primary : color.black,
        activity: props.name === 'activity' ? color.primary : color.black,
        friends: props.name === 'friends' ? color.primary : color.black,
        more: props.name === 'more' ? color.primary : color.black,
        dashboard: props.name === 'dashboard' ? color.primary : color.black
    };

    const tabs = [
        {
            action: () => Actions.calculate(),
            icon: 'pin',
            color: footerColor.calculate,
            name: 'Calculate'
        },
        {
            action: () => Actions.activity(),
            icon: 'pulse',
            color: footerColor.activity,
            name: 'Activity'
        },
        {
            action: () => Actions.friends(),
            icon: 'people',
            color: footerColor.friends,
            name: 'Friends'
        },
        {
            action: () => Actions.dashboard(),
            icon: 'stats',
            color: footerColor.dashboard,
            name: 'Dashboard'
        },
        {
            action: () => Actions.more(),
            icon: 'more',
            color: footerColor.more,
            name: 'More'
        }
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                return (
                    <TouchableHighlight
                        style={styles.touch}
                        onPress={tab.action}
                        underlayColor={color.white}
                        activeOpacity={0.5}
                        key={tab.name}
                    >
                        <View style={styles.nav}>
                            <Icon
                                name={getIcon(tab.icon)}
                                size={size}
                                color={tab.color}
                                style={styles.icon}
                            />
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: tab.color
                                    }
                                ]}
                            >
                                {tab.name}
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            })}
            <OfflineNotice />
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 0,
        width: Dimensions.get('window').width,
        backgroundColor: color.white,
        borderTopWidth: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        zIndex: 100,
        position: 'absolute',
        height: 45
    },
    nav: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    text: {
        fontSize: 10,
        letterSpacing: 1
    },
    touch: {
        paddingLeft: 5,
        paddingRight: 5
    }
});

Footer.propTypes = {
    name: PropTypes.string
};

export default Footer;
