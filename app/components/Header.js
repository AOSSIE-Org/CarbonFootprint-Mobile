import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { getIcon } from '../config/helper';

class Header extends Component {
    render() {
        let props = this.props;
        if (props.icon) {
            return (
                <View style={styles.container}>
                    <Icon.Button name={getIcon(props.iconName)} backgroundColor="#538124"
                        iconStyle={styles.icon} onPress={() => Actions.pop()} size={22}>
                    </Icon.Button>
                    <Text style={[styles.white, styles.text]}>{props.text}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[styles.white, styles.text]}>{props.text}</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        width: Dimensions.get("window").width,
        backgroundColor: '#538124',
        height: 45,
        paddingLeft: 13,
        alignItems: 'center',
        flexDirection: 'row',
    },
    white: {
        color: '#fff',
    },
    text: {
        fontSize: 16,
        letterSpacing: 1,
    },
    icon: {
        borderRadius: 0,
        marginRight: 20,
    }
})

export default Header;
