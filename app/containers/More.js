import React, { Component } from 'react';
import {
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

import Footer from '../components/Footer';
import Header from '../components/Header';

class More extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header icon={false} text="More" />
                <Footer name="more" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: "#f7f7f7",
    },
})

export default More;
