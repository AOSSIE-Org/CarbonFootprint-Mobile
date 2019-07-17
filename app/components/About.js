import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    StatusBar,
    TouchableHighlight,
    Alert,
    Linking,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ProfileHeader from './ProfileHeader';
import StatusBarBackground from '../components/StatusBarBackground';
import { aossieTitle, aossieDescription, appDescription } from '../config/constants';
import Header from './Header';
import images from '../config/images';
import { newColors } from '../config/helper';
const { width, height } = Dimensions.get('window');
const About = () => {
    const style = {
        backgroundColor: newColors.secondary
    };
    var socialAttr = [
        {
            image: images.gitlab,
            onPress: () => Linking.openURL('https://gitlab.com/aossie/CarbonFootprint-Mobile')
        },
        {
            image: images.gsoc,
            onPress: () =>
                Linking.openURL('https://groups.google.com/forum/#!forum/aossie-gsoc-2017')
        },
        {
            image: images.twitter,
            onPress: () => Linking.openURL('https://twitter.com/aossie_org')
        },
        {
            image: images.webiste,
            onPress: () => Linking.openURL('https://aossie.gitlab.io/')
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBarBackground style={style} />
            <ProfileHeader iconName="long-arrow-left" text="About Us" />
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.main}>
                    <Image source={images.aossie} style={styles.image} />
                    <Text style={styles.title}>{aossieTitle}</Text>
                    <Text style={styles.description}>{aossieDescription}</Text>
                    <View style={styles.divider} />
                    <Image source={images.logo} style={styles.image} />
                    <Text style={styles.title}>CarbonFootprint</Text>
                    <Text style={styles.description}>{appDescription}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.title}>Follow us and contribute to our project!</Text>
                    <View style={styles.social}>
                        {socialAttr.map((obj, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={obj.onPress}>
                                    <Image
                                        style={styles.socialItem}
                                        resizeMethod="resize"
                                        source={obj.image}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );

    const calcMethod = () => {
        Alert.alert(
            'co2 calculation method',
            'Present formula for calculating co2 emission is: emitted co2 (in kg) = co2 emission rate of fuel (in kg/L) * (traveled distance (in km) / mileage of vehicle (in km/L)). If activity is IN_VEHICLE, co2 calculated by above formula becomes Emitted co2 and Saved co2 is 0. If activity is WALKING, ON_BICYCLE etc., co2 calculated by above formula becomes Saved co2 and Emitted co2 is 0.',
            [
                {
                    text: 'OK'
                }
            ],
            { cancelable: true }
        );
    };
};

//StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: newColors.secondary
    },
    scrollWrapper: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    },
    main: {
        alignItems: 'center',
        marginTop: 20, // (45 + 20)
        padding: 13
    },
    image: {
        width: 120,
        height: 120
    },
    large: {
        letterSpacing: 2,
        fontSize: 20,
        marginTop: 10
    },
    small: {
        fontSize: 15,
        padding: 13,
        textAlign: 'center'
    },
    text: {
        marginTop: 10
    },
    blueText: {
        color: 'blue'
    },
    title: {
        fontSize: 18,
        margin: 8,
        fontFamily: 'Poppins-SemiBold',
        color: newColors.black,
        marginBottom: height / 38,
        textAlign: 'center'
    },
    description: {
        marginHorizontal: width / 16,
        marginBottom: height / 38,
        fontSize: 15,
        fontFamily: 'Muli',
        textAlign: 'center'
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(215,215,215,0.5)',
        width: 350,
        marginTop: 20,
        marginBottom: 20
    },
    socialItem: {
        height: 30,
        width: 30
    },
    social: {
        flex: 1,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    }
});

//making About Container Available to other parts of App
export default About;
