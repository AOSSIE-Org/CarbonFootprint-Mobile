import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getIcon } from '../config/helper';

class BackHeader extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Icon.Button name={getIcon("arrow-back")} backgroundColor="#fff" iconStyle={styles.icon}
                    onPress={() => Actions.home()}>
                </Icon.Button>
                { this.props.text ?
                    <Icon.Button backgroundColor="#fff" onPress={this.props.link}
                        iconStyle={styles.iconText}>
                        <Text style={styles.text}>{this.props.text}</Text>
                    </Icon.Button>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingRight: 10,
        paddingLeft: 10
    },
    icon: {
        color: '#666',
    },
    text: {
        fontSize: 14,
        color: '#666'
    },
    iconText: {
        marginRight: 0
    }
})

export default BackHeader;
