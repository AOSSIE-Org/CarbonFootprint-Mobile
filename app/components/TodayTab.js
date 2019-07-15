/*
 * To show summary stats for today
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    TouchableNativeFeedback,
    ImageBackground
} from 'react-native';

// import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import images from '../config/images';
import { getIcon, color, newColors } from '../config/helper';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import ActivityTabBar from './ActivityTabBar';

/**
 * Today Tab Component activity from day
 * @extends Component
 */
export default class TodayTab extends Component {
    constructor(props) {
        super(props);
        ActivityHistoryStorage.createDB();
        var data = ActivityHistoryStorage.getTotalData(new Date().toDateString());
        this.state = {
            co2Emitted: data.co2Emitted,
            co2Saved: data.co2Saved,
            co2WalkSaved: data.co2WalkSaved,
            co2RunSaved: data.co2RunSaved,
            co2CycleSaved: data.co2CycleSaved,
            co2VehicleEmitted: data.co2VehicleEmitted,
            dist: data.dist,
            distWalk: data.distWalk,
            distRun: data.distRun,
            distCycle: data.distCycle,
            distVehicle: data.distVehicle
        };
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.card}>
                <Image source={images.carousel_1} />
                <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardText}>{item.title.toUpperCase()}</Text>
                    <Text style={styles.cardText2}>{item.text}</Text>
                </View>
            </View>
        );
    }

    render() {
        let swiper1 = [
            {
                title: 'saved',
                text: this.state.co2Saved
            },
            {
                title: 'emitted',
                text: this.state.co2Emitted
            },
            {
                title: 'distance',
                text: this.state.dist
            }
        ];

        let tabsAlt = [
            {
                icon: 'directions-walk',
                text: 'WALK',
                co2saved: this.state.co2WalkSaved,
                co2emitted: 0,
                distance: this.state.distWalk
            },
            {
                icon: 'directions-run',
                text: 'RUN',
                co2saved: this.state.co2RunSaved,
                co2emitted: 0,
                distance: this.state.distRun
            },
            {
                icon: 'motorcycle',
                text: 'CYCLE',
                co2saved: this.state.co2CycleSaved,
                co2emitted: 0,
                distance: this.state.distCycle
            },
            {
                icon: 'directions-car',
                text: 'CAR',
                co2saved: 0,
                co2emitted: this.state.co2VehicleEmitted,
                distance: this.state.distVehicle
            }
        ];
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.co2wrapper}>
                        <Text style={styles.co}>CO</Text>
                        <Text style={styles.two}>2</Text>
                    </View>
                    <View>
                        <Text>TOTAL DISTANCE</Text>
                        <Text style={styles.totalDistance}>2.3 km</Text>
                    </View>
                </View>
                <View style={styles.cardsWrapper}>
                    <Carousel
                        ref={c => {
                            this._carousel = c;
                        }}
                        data={swiper1}
                        renderItem={this._renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width * 0.7}
                    />
                </View>
                <View style={styles.tabViewContainer}>
                    <ScrollableTabView
                        renderTabBar={() => <ActivityTabBar tabsAlt={tabsAlt} />}
                        style={styles.miniScrollView}
                    >
                        {tabsAlt.map(obj => {
                            return (
                                <View style={styles.tabContent}>
                                    <View style={styles.onethirdbox}>
                                        <Text style={styles.lightbig}>{obj.distance}</Text>
                                        <Text style={styles.darksmall}>DISTANCE</Text>
                                    </View>
                                    <View style={styles.onethirdbox}>
                                        <Text style={styles.lightbig}>{obj.co2saved}</Text>
                                        <Text style={styles.darksmall}>SAVED</Text>
                                    </View>
                                    <View style={styles.onethirdbox}>
                                        <Text style={styles.lightbig}>{obj.co2emitted}</Text>
                                        <Text style={styles.darksmall}>EMITTED</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollableTabView>
                </View>
            </ScrollView>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    },
    headingContainer: {
        paddingTop: 20,
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    upperActivityView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    lowerActivityView: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    lowerActivityItemView: {
        padding: 5,
        alignItems: 'center'
    },
    co2Icon: {
        height: 100,
        width: 100
    },
    mediumText: {
        fontSize: 25
    },
    smallText: {
        fontSize: 12,
        paddingLeft: 5,
        paddingBottom: 5
    },
    co2wrapper: {
        flexDirection: 'row',
        alignContent: 'flex-start'
    },
    co: {
        fontSize: 36,
        fontFamily: 'Poppins',
        color: newColors.black
        // backgroundColor: 'red'
    },
    two: {
        fontFamily: 'Poppins',
        color: newColors.black,
        fontSize: 18
    },
    totalDistance: {
        textAlign: 'right',
        color: newColors.black,
        fontFamily: 'Muli-Bold',
        fontSize: 16
    },
    cardsWrapper: {
        // backgroundColor: 'green',
        marginTop: 20,
        height: 200,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swiper1: {
        width: Dimensions.get('window').width * 0.7,
        // height: 200,
        backgroundColor: 'yellow',
        // alignItems: 'center',
        // justifyContent: 'center',
        overflow: 'visible'
    },
    card: {
        // backgroundColor: 'red',
        height: 400
    },
    tabViewContainer: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 20,
        width: Dimensions.get('window').width
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width * 0.8,
        marginHorizontal: Dimensions.get('window').width * 0.1,
        marginTop: 20
    },
    onethirdbox: {
        alignItems: 'center'
    },
    lightbig: {
        fontFamily: 'Poppins-Light',
        fontSize: 42
    },
    darksmall: {
        fontFamily: 'Poppins-Light',
        fontSize: 16,
        marginTop: -5
    },
    cardTextWrapper: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    cardText: {
        color: 'white',
        fontFamily: 'Muli',
        fontSize: 20
    },
    cardText2: {
        marginTop: 10,
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 84
    }
});
