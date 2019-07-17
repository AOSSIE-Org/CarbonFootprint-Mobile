import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { newColors } from '../config/helper';
import StatusBarBackground from '../components/StatusBarBackground';

const Terms = () => {
    const style = {
        backgroundColor: newColors.secondary
    };
    return (
        <View style={styles.container}>
            <StatusBarBackground style={style} />
            <ProfileHeader iconName="long-arrow-left" text="Terms and Conditions" />
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
        backgroundColor: newColors.secondary
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        paddingTop: 20, // (45 + 10)
        padding: 13
    },
    text: {
        fontSize: 13,
        color: '#555',
        padding: 13
    }
});

export default Terms;
