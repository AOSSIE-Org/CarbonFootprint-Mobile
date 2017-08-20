import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Platform,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { getIcon, color } from '../config/helper';

class Header extends Component {
    render() {
        let props = this.props;
        let topContainerStyle = [styles.container];
        if (!props.noShadow) {
            topContainerStyle.push(styles.shadow);
        }
        if (Platform.OS === 'android') {
            topContainerStyle.push(styles.leftAlign);
        }
        if (props.icon) {
            if (Platform.OS === "ios") {
                topContainerStyle.push(styles.spaceBetween);
            }
            return (
                <View style={topContainerStyle}>
                    <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
                    <Icon.Button name={getIcon(props.iconName)} backgroundColor={color.primary}
                        iconStyle={styles.icon} onPress={() => Actions.pop()} size={22}>
                    </Icon.Button>
                    <Text style={styles.text}>{props.text}</Text>
                    <Text style={styles.greenText}>Carbon</Text>
                </View>
            )
        } else {
            return (
                <View style={topContainerStyle}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        width: Dimensions.get("window").width,
        backgroundColor: color.primary,
        height: 64,
        paddingTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    leftAlign: {
        paddingLeft: 13,
        justifyContent: 'flex-start',
    },
    shadow: {
        shadowColor: color.shadowGrey,
        borderBottomWidth: 1,
        borderColor: color.borderGrey,
        shadowOpacity: 10,
        shadowOffset: {
            height: 5,
        },
    },
    text: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: "500",
        color: color.white,
        textAlign: 'center',
    },
    icon: {
        borderRadius: 0,
        color: color.grey,
    },
    /* This is a hack. Need to revisit */
    greenText: {
        zIndex: 0,
        color: color.primary,
    }
})

export default Header;
