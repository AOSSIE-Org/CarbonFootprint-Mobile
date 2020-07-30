/*
 * To show summary stats for today
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';

// import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import images from '../config/images';
import { newColors } from '../config/helper';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import ActivityTabBar from './ActivityTabBar';

const TodayTab = props => {
    ActivityHistoryStorage.createDB();
    let data = ActivityHistoryStorage.getTotalData(new Date().toDateString());

    const [co2Emitted, setCo2Emitted] = useState(data.co2Emitted);
    const [dist, setDist] = useState(data.dist);
    const [co2Saved, setCo2Saved] = useState(data.co2saved);
    const [walk, setWalk] = useState({
        co2WalkSaved: data.co2WalkSaved,
        distWalk: data.distWalk
    });
    const [run, setRun] = useState({
        co2RunSaved: data.co2RunSaved,
        distRun: data.distRun
    });
    const [cycle, setCycle] = useState({
        co2CycleSaved: data.co2CycleSaved,
        distCycle: data.distCycle
    });
    const [vehicle, setVehicle] = useState({
        co2VehicleEmitted: data.co2VehicleEmitted,
        distVehicle: data.distVehicle
    });

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <Image source={images.carousel_1} />
                <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardText}>{item.title.toUpperCase()}</Text>
                    <Text style={styles.cardText2}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const _renderTabBar = () => {
        return <ActivityTabBar tabsAlt={tabsAlt} />;
    };

    let swiper1 = [
        {
            title: 'saved',
            text: co2Saved
        },
        {
            title: 'emitted',
            text: co2Emitted
        },
        {
            title: 'distance',
            text: dist
        }
    ];
    let tabsAlt = [
        {
            icon: 'directions-walk',
            text: 'WALK',
            co2saved: walk.co2WalkSaved,
            co2emitted: 0,
            distance: walk.distWalk
        },
        {
            icon: 'directions-run',
            text: 'RUN',
            co2saved: run.co2RunSaved,
            co2emitted: 0,
            distance: run.distRun
        },
        {
            icon: 'motorcycle',
            text: 'CYCLE',
            co2saved: cycle.co2CycleSaved,
            co2emitted: 0,
            distance: cycle.distCycle
        },
        {
            icon: 'directions-car',
            text: 'CAR',
            co2saved: 0,
            co2emitted: vehicle.co2VehicleEmitted,
            distance: vehicle.distVehicle
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
                    data={swiper1}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * 0.7}
                />
            </View>
            <View style={styles.tabViewContainer}>
                <ScrollableTabView renderTabBar={_renderTabBar} style={styles.miniScrollView}>
                    {tabsAlt.map(obj => {
                        return (
                            <View style={styles.tabContent} key={obj.text}>
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
};

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

export default React.memo(TodayTab);
