import React from 'react';
import { View, StyleSheet, Dimensions, Text, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { getIcon, color } from '../config/helper';

/**
 * Header Component
 * @param  props properties from Parent Class
 */
const Header = props => {
    let topContainerStyle = [styles.container];
    if (!props.noShadow) {
        topContainerStyle.push(styles.shadow);
    }
    if (Platform.OS === 'android') {
        topContainerStyle.push(styles.leftAlign);
    }
    if (props.icon) {
        if (Platform.OS === 'ios') {
            topContainerStyle.push(styles.spaceBetween);
        }
        return (
            <View style={topContainerStyle}>
                <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
                <Icon.Button
                    name={getIcon(props.iconName)}
                    backgroundColor={color.primary}
                    iconStyle={styles.icon}
                    onPress={() => Actions.pop()}
                    size={22}
                />
                <Text style={styles.text}>{props.text}</Text>
                <Text style={styles.greenText}>Carbon</Text>
            </View>
        );
    } else {
        return (
            <View style={topContainerStyle}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        );
    }
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        top: 0,
        width: Dimensions.get('window').width,
        backgroundColor: color.primary,
        height: Platform.OS === 'ios' ? 64 : 50,
        paddingTop: Platform.OS === 'ios' ? 15 : 0,
        alignItems: 'center',
        flexDirection: 'row',
        // position: 'absolute',
        justifyContent: 'center'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    leftAlign: {
        paddingLeft: 13,
        justifyContent: 'flex-start'
    },
    shadow: {
        shadowColor: color.shadowGrey,
        borderBottomWidth: 1,
        borderColor: color.borderGrey,
        shadowOpacity: 10,
        shadowOffset: {
            height: 5
        }
    },
    text: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '500',
        color: color.white,
        textAlign: 'center'
    },
    icon: {
        borderRadius: 0,
        color: color.grey,
        marginLeft: 13
    },
    /* This is a hack. Need to revisit */
    greenText: {
        zIndex: 0,
        color: color.primary
    }
});

Header.propTypes = {
    noShadow: PropTypes.bool,
    text: PropTypes.string,
    iconName: PropTypes.string
};

export default Header;
