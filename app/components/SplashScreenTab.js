import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreenTab({ tab }) {
    return (
        <View style={styles.mainWrapper}>
            {/* <View style={styles.iconWrapper}>
                <Image source={require('../../assets/images/splash_screen_logo.png')} style={styles.icon}/>
            </View> */}
            <View style={styles.mainView}>
                <Text style={styles.titleText}>{tab.text}</Text>
                <Image source={tab.source} style={styles.mainImage} />
                <Text style={styles.descText}>{tab.desc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 0.85
    },
    iconWrapper: {
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'flex-start'
    },
    icon: {
        marginTop: 30,
        marginLeft: 30,
        width: 40,
        height: 40
    },
    image: {
        width: 120,
        height: 120
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainImage: {
        marginTop: 30,
        marginBottom: 50
        // width: '80%'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 10,
        color: 'white'
    },
    descText: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'Muli-Light',
        color: 'white',
        width: '80%'
    }
});
