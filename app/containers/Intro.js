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
import Swiper, { nextButton } from 'react-native-swiper';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import * as IntroAction from '../actions/IntroAction';



class Intro extends Component {
    state = {
        index:0
    }
    componentWillMount() {
        AsyncStorage.getItem('isIntroShown', (err, result) => {
            if (result !== null) {
                console.log(result);
                Actions.master();
            } else {
                SplashScreen.hide();
                console.log(result);
            }
        });
        this.setState({ statusBarColorState: '#59b2ab' })
    }
    componentWillReceiveProps(props) {
        if (!props.intro.isFirst) {
            Actions.master();
        }
    }
    onPress = () => {
        AsyncStorage.setItem('isIntroShown', 'forIntro');
        this.props.firstOpen();
    };
    
    render() {
        let skipButton = null;
        if(this.state.index!=5){
            skipButton = (
<TouchableOpacity
                    style={styles.absoluteSkipButton}
                    onPress={this.onPress}
                >
                        <Text>skip</Text>
                </TouchableOpacity>
            )
        }

        const statusBarColor = ['#20837C', '#132584', '#CD0045', '#8E2200', '#3E0560', '#044208']
        return (
            <View style={styles.container}>
                <Swiper
                    onIndexChanged={(index) => {
                        StatusBar.setBackgroundColor(statusBarColor[index]);
                        this.setState({index})
                    }}
                    style={styles.wrapper}
                    loop={false}
                    showsButtons={true}
                    buttonWrapperStyle={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        position: 'absolute',
                        marginRight: 20,
                        alignItems: 'flex-end'
                    }}
                    nextButton={<Text style={styles.nextButton}>Next</Text>}
                    prevButton={<Text style={styles.buttonText} />}
                >
                    <View style={styles.slide1}>
                    <StatusBar 
                        barStyle="light-content"
                        hidden={false} 
                        backgroundColor='#20837C' 
                        translucent={true}
                    />
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/logo.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>
                                CarbonFootprint - Mobile
                            </Text>
                            <Text style={styles.descText}>
                                CarbonFootprint Mobile is Mobile 
                                application that raises environmental awareness
                                by tracking user activity and calculating carbon
                                footprints.
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                            style={styles.skipButton}
                            onPress={this.onPress}
                        >
                            <Text>skip</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.slide2}>
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/co2.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>Emission of co2</Text>
                            <Text style={styles.descText}>
                                Release of co2 in environment is increasing everyday
                                this app will calculate your release of co2
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                            style={styles.skipButton}
                            onPress={this.onPress}
                        >
                            <Text>Skip</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.slide3}>
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/activity.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>
                                Activity Recognition
                            </Text>
                            <Text style={styles.descText}>
                                Detects user's activity and calculate travelled
                                distance and amount of emitted co2 (at runtime)
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                            style={styles.skipButton}
                            onPress={this.onPress}
                        >
                            <Text>skip</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.slide4}>
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/notif.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>Live Notification</Text>
                            <Text style={styles.descText}>
                                push notification service to inform user about his
                                activity
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                            style={styles.skipButton}
                            onPress={this.onPress}
                        >
                            <Text>skip</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.slide5}>
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/route.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>
                                Google Maps Service
                            </Text>
                            <Text style={styles.descText}>
                                Travel from one point to another point and find your
                                CO2 release
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                            style={styles.skipButton}
                            onPress={this.onPress}
                        >
                            <Text>skip</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.slide6}>
                        <View style={styles.mainView}>
                            <Image
                                source={require('../images/green.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.whiteView}>
                            <Text style={styles.titleText}>Carbon Footprints</Text>
                            <Text style={styles.descText}>
                                Goal is to make everyone aware of CO2 usage
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={this.onPress}
                        >
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
                {skipButton}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    wrapper:{
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#59b2ab'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F51B5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EC407A'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E64A19'
    },
    slide5: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A1B9A'
    },
    slide6: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E7D32'
    },

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
    descText: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10
    },
    mainView: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120
    },
    whiteView: {
        backgroundColor: '#ffffff',
        width: '100%',
        flex: 0.3,
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    nextButton: {
        marginRight: 10,
        marginBottom: 15
    },
    absoluteSkipButton: {
        position: 'absolute',
        bottom: 20,
        left: 10
    },
});

function mapStateToProps(state) {
    return {
        intro: state.intro
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, IntroAction), dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Intro);
