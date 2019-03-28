import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Header from './Header';

const Terms = () => {
    return (
        <View style={styles.container}>
            <Header icon={true} iconName="arrow-back" text="Terms and Conditions" />
            <View style={styles.main}>
                <Text style={styles.text}>
                    This mobile application is provided free of cost. We accept no liability for it.
                    Activity recognition and distance calculation is done using external
                    APIs/Libraries. We are not responsible for any incorrect data.
                </Text>
            </View>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    main: {
        alignItems: 'center',
        marginTop: 55, // (45 + 10)
        padding: 13
    },
    text: {
        fontSize: 13,
        color: '#555',
        padding: 13
    }
});

export default Terms;
