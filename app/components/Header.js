import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Header extends Component {
    render() {
        let props = this.props;
        if (props.icon) {
            return null;
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[styles.white]}>{props.text}</Text>
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
    }
})

export default Header;
