import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Header from '../components/Header';

class Friends extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header icon={false} text="Friends" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underline: {
        height: 2,
        backgroundColor: "#f7f7f7",
    },
    tabText: {
        fontSize: 13,
        letterSpacing: 1,
    },
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
