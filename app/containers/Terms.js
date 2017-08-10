import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import Header from '../components/Header';

class Terms extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header icon={true} iconName="arrow-back" text="Terms and Conditions" />
                <View style={styles.main}>
                    <Text style={styles.text}>
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                        These are Terms and Conditions.
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
        marginTop: 55, // (45 + 10)
        padding: 13,
    },
    text: {
        fontSize: 13,
        color: "#555",
        padding: 13,
    },
})

export default Terms;
