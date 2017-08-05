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
                        active: normal
        }

        return(
            <View style={styles.container}>
                <TouchableHighlight style={styles.touch} onPress={() => {Actions.calculate()}}
                    underlayColor={underlay} activeOpacity={0.5}>
                    <View style={styles.nav}>
                        <Icon name={getIcon("pin")} size={size} color={color.calculate} style={styles.icon}/>
                        <Text style={[styles.text, {color: color.calculate}]}>Calculate</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touch} onPress={() => {Actions.activity()}}
                    underlayColor={underlay} activeOpacity={0.5}>
                    <View style={styles.nav}>
                        <Icon name={getIcon("pulse")} size={size} color={color.activity} style={styles.icon}/>
                        <Text style={[styles.text, {color: color.activity}]}>Activity</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touch} onPress={() => {}}
                    underlayColor={underlay} activeOpacity={0.5}>
                    <View style={styles.nav}>
                        <Icon name={getIcon("people")} size={size} color={color.friends} style={styles.icon}/>
                        <Text style={[styles.text, {color: color.friends}]}>Friends</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touch} onPress={() => {Actions.more()}}
                    underlayColor={underlay} activeOpacity={0.5}>
                    <View style={styles.nav}>
                        <Icon name={getIcon("more")} size={size} color={normal} style={styles.icon}/>
                        <Text style={[styles.text, {color: color.more}]}>More</Text>
                    </View>
                </TouchableHighlight>
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
