import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';

class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header icon={true} iconName="arrow-back" text="About" />
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text>This is image</Text>
                    </View>
                    <View style={styles.info}>
                        <Text>This is info</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 45,
        flex: 1,
    },
    header: {
        flex: 0.4,
        backgroundColor: '#538124',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 0.6,
        padding: 14,
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
