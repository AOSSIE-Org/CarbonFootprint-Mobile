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
    TouchableNativeFeedback
} from 'react-native';

import Swiper from 'react-native-swiper';

// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import images from '../config/images';
import { getIcon, color } from '../config/helper';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';

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

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headingContainer}>
                    <Text>
                        CO<Text>2</Text>
                    </Text>
                    <View>
                        <Text>TOTAL DISTANCE</Text>
                        <Text>2.3 km</Text>
                    </View>
                </View>
                <View>
                    {/* <Swiper
                >
                    
                </Swiper> */}
                </View>
                {/* <View style={styles.container}>
                    <View style={styles.upperActivityView}>
                        <View style={styles.hrView}>
                            <View style={styles.blackDot} />
                            <Text style={styles.smallText}>Emitted CO</Text>
                            <Text style={styles.subText}>2</Text>
                            <View style={styles.greenDot} />
                            <Text style={styles.smallGreenText}>Saved CO</Text>
                            <Text style={styles.subText}>2</Text>
                        </View>
                        <View style={styles.largeActivity_icon}>
                            <Text style={styles.mediumText}>TODAY</Text>
                            <View style={styles.hrView}>
                                <Text style={styles.mediumText}>{this.state.dist.toFixed(2)}</Text>
                                <Text style={styles.smallText}>km</Text>
                            </View>
                            <Image source={images.co2Icon} style={styles.co2Icon} />
                            <View style={styles.hrView}>
                                <Text style={styles.mediumText}>
                                    {this.state.co2Emitted.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>kg</Text>
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallGreenText}>
                                    {this.state.co2Saved.toFixed(2)}
                                </Text>
                                <Text style={styles.smallGreenText}>kg</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerActivityView}>
                        <View style={styles.lowerActivityItemView}>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>
                                    {this.state.distWalk.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>km</Text>
                            </View>
                            <View style={styles.activity_icon}>
                                <Icon name={getIcon('walk')} size={35} color="white" />
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>0.00</Text>
                                <Text style={styles.smallText}>kg</Text>
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallGreenText}>
                                    {this.state.co2WalkSaved.toFixed(2)}
                                </Text>
                                <Text style={styles.smallGreenText}>kg</Text>
                            </View>
                        </View>
                        <View style={styles.lowerActivityItemView}>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>
                                    {this.state.distRun.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>km</Text>
                            </View>
                            <View style={styles.activity_icon}>
                                <Icon1 name="run" size={35} color="white" />
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>0.00</Text>
                                <Text style={styles.smallText}>kg</Text>
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallGreenText}>
                                    {this.state.co2RunSaved.toFixed(2)}
                                </Text>
                                <Text style={styles.smallGreenText}>kg</Text>
                            </View>
                        </View>
                        <View style={styles.lowerActivityItemView}>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>
                                    {this.state.distCycle.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>km</Text>
                            </View>
                            <View style={styles.activity_icon}>
                                <Icon name={getIcon('bicycle')} size={35} color="white" />
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>0.00</Text>
                                <Text style={styles.smallText}>kg</Text>
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallGreenText}>
                                    {this.state.co2CycleSaved.toFixed(2)}
                                </Text>
                                <Text style={styles.smallGreenText}>kg</Text>
                            </View>
                        </View>
                        <View style={styles.lowerActivityItemView}>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>
                                    {this.state.distVehicle.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>km</Text>
                            </View>
                            <View style={styles.activity_icon}>
                                {this.props.storage.data.automobile === 'Car' ? (
                                    <Icon name={getIcon('car')} size={35} color="white" />
                                ) : this.props.storage.data.automobile === 'Bus' ? (
                                    <Icon name={getIcon('bus')} size={35} color="white" />
                                ) : (
                                    <Icon name={getIcon('train')} size={35} color="white" />
                                )}
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallText}>
                                    {this.state.co2VehicleEmitted.toFixed(2)}
                                </Text>
                                <Text style={styles.smallText}>kg</Text>
                            </View>
                            <View style={styles.hrView}>
                                <Text style={styles.smallGreenText}>0.00</Text>
                                <Text style={styles.smallGreenText}>kg</Text>
                            </View>
                        </View>
                    </View>
                </View> */}
            </ScrollView>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
        // backgroundColor: '#FFFFFF'
    },
    upperActivityView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        height: Dimensions.get('window').height * 0.9,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFFFF'
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
    smallGreenText: {
        fontSize: 12,
        color: 'green',
        paddingLeft: 5,
        paddingBottom: 5
    },
    subText: {
        fontSize: 9,
        paddingBottom: 4
    },
    hrView: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    largeActivity_icon: {
        height: 250,
        borderRadius: 125,
        width: 250,
        backgroundColor: '#f5f5f5',
        borderWidth: 2,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    activity_icon: {
        height: 50,
        borderRadius: 25,
        width: 50,
        backgroundColor: color.primary,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    greenDot: {
        height: 10,
        borderRadius: 5,
        width: 10,
        backgroundColor: 'green',
        marginLeft: 30,
        marginBottom: 8
    },
    blackDot: {
        height: 10,
        borderRadius: 5,
        width: 10,
        backgroundColor: '#616161',
        marginBottom: 8
    }
});
