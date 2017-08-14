import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, getIcon } from '../config/helper';

class FriendRow extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: Dimension.get("window").width * 0.8,
        borderTopWidth: 2,
        borderColor: color.borderGrey,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default FriendRow;
