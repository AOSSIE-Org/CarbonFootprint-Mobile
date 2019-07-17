import React, { Component } from 'react';
import {
    StatusBar,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { newColors } from '../config/helper';
import SplashScreenTab from './SplashScreenTab';
import StatusBarBackground from './StatusBarBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../config/images';

export default class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.checkIsIntroShown();
    }
    checkIsIntroShown = () => {
        AsyncStorage.getItem('isIntroShown', (err, result) => {
            if (result !== null) {
                Actions.master();
            } else {
                SplashScreen.hide();
            }
        });
    };

    onPress = () => {
        AsyncStorage.setItem('isIntroShown', 'forIntro');
        Actions.master();
    };

    render() {
        let slides = [
            {
                text: 'Track Emission',
                desc:
                    'Release of co2 in environment is increasing everyday. This app will calculate and track your release.',
                style: styles.slide1,
                source: images.splash_screen_1
            },
            {
                text: 'Activity Recognition',
                desc:
                    "Detects user's activity and calculate travelled distance and amount of emitted co2 (at runtime).",
                style: styles.slide2,
                source: images.splash_screen_2
            },
            {
                text: 'Push Notifications',
                desc: 'Push notification service to inform user about his activity,',
                style: styles.slide3,
                source: images.splash_screen_3
            }
        ];

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <StatusBarBackground style={{ backgroundColor: newColors.primary }} />
                <View style={styles.iconWrapper}>
                    <Image source={images.splash_screen_logo} style={styles.icon} />
                </View>
                <Swiper
                    onIndexChanged={index => {
                        this.setState({ index });
                    }}
                    style={styles.wrapper}
                    loop={false}
                    activeDot={activeDot()}
                    dotColor="white"
                    paginationStyle={{
                        marginBottom: -30
                    }}
                >
                    {slides.map(element => {
                        return <SplashScreenTab key={element.text} tab={{ ...element }} />;
                    })}
                </Swiper>
                {/* {skipButton} */}
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.startJourneyButton} onPress={this.onPress}>
                        <Text style={styles.startText}>Start your journey</Text>
                        <Icon name="caret-right" size={20} color={newColors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function activeDot() {
    return <View style={styles.activeDotStyle} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: newColors.primary
    },
    activeDotStyle: {
        backgroundColor: 'white',
        width: 40,
        height: 7,
        borderRadius: 5,
        marginRight: 4,
        marginLeft: 4
    },
    iconWrapper: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    icon: {
        marginTop: 30,
        marginLeft: 30,
        width: 40,
        height: 40
    },
    wrapper: {},
    doneButton: {
        position: 'absolute',
        bottom: 25,
        right: 15
    },
    skipButton: {
        position: 'absolute',
        bottom: 20,
        left: 10
    },
    nextButton: {
        marginRight: 10,
        marginBottom: 15
    },
    bottomView: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startJourneyButton: {
        width: '70%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 50
    },
    startText: {
        // backgroundColor: 'red'
        fontFamily: 'Poppins-SemiBold',
        color: newColors.primary,
        marginRight: 10
    }
});
