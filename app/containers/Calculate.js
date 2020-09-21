import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    Platform,
    ActivityIndicator,
    BackHandler,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarBackground from '../components/StatusBarBackground';
import _ from 'lodash';

import StaticMap from './StaticMap';
import FootprintCard from '../components/FootprintCard';

import { color, getIcon, calcCo2, getMileage, getFuelRate } from '../config/helper';
import {
    getLocation,
    getStorage,
    getDirections,
    set_destination
} from '../config/actionDispatcher';
import { Actions } from 'react-native-router-flux';
import { formatName } from '../config/helper';

const Calculate = props => {
    const [source, setSource] = useState({
        latitude: null,
        longitude: null
    });
    const [destination, setDestination] = useState({
        latitude: null,
        longitude: null
    });
    const [tab, setTab] = useState(0);
    const [backClickCount, setBackClickCount] = useState(false);
    const dispatch = useDispatch();
    const location = useSelector(state => state.location);
    const direction = useSelector(state => state.direction);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [backClickCount]);

    useEffect(() => {
        if (backClickCount) {
            ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackClickCount(false), 1000);
        }
    }, [backClickCount]);

    useEffect(() => {
        if (!location.latitude) {
            dispatch(getLocation());
        }
        dispatch(getStorage());
    }, []);

    useEffect(() => {
        let newSource = direction.source;
        let newDestination = direction.destination;
        if (newSource.latitude) {
            if (newDestination.latitude) {
                if (!_.isEqual(source, newSource) || !_.isEqual(destination, newDestination)) {
                    setSource(newSource);
                    setDestination(newDestination);
                    dispatch(getDirections(newSource, newDestination, tab));
                }
            }
        }
    }, [direction]);

    const handleBackPress = () => {
        if (backClickCount) {
            BackHandler.exitApp();
        } else {
            setBackClickCount(true);
        }
        return true;
    };

    /**
     * call back function when changed vechile type
     * @param  tab number each indicates vechle id check FootprintCard.js
     * @return current tab status
     */
    const onChangeTab = tab => {
        setTab(tab);
        dispatch(getDirections(source, destination, tab));
    };

    const resetCoordHelper = () => {
        const coord = {
            latitude: null,
            longitude: null
        };
        dispatch(getLocation());
        dispatch(set_destination(coord, 'Where to?'));
    };

    let newSource = direction.source;
    let newDestination = direction.destination;
    let region = direction.region;
    let coords = direction.coords;
    let map = <StaticMap />;

    const updateMap = () => {
        if (newSource.latitude) {
            if (newDestination.latitude) {
                map = (
                    <StaticMap
                        source={newSource}
                        destination={newDestination}
                        region={region}
                        coords={coords}
                    />
                );
            } else {
                map = <StaticMap source={newSource} region={region} />;
            }
        }
        return map;
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={color.darkPrimary}
                barStyle="light-content"
                hidden={false}
            />
            <StatusBarBackground />
            {location.isFetching ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#538124" />
                </View>
            ) : (
                updateMap()
            )}
            <View style={styles.buttonWrapper}>
                <View style={styles.button}>
                    <View style={styles.box}>
                        <Icon.Button
                            name={getIcon('pin')}
                            backgroundColor={color.lightPrimary}
                            borderRadius={2}
                            size={16}
                            iconStyle={styles.icon}
                            onPress={() => Actions.placeSearch({ value: 0 })}
                        >
                            <Text style={styles.text}>{formatName(direction.sourceName)}</Text>
                        </Icon.Button>
                    </View>
                    <View>
                        <Icon.Button
                            name={getIcon('flag')}
                            backgroundColor={color.lightPrimary}
                            borderRadius={2}
                            size={16}
                            iconStyle={styles.icon}
                            onPress={() => Actions.placeSearch({ value: 1 })}
                        >
                            <Text style={styles.text}>{formatName(direction.destinationName)}</Text>
                        </Icon.Button>
                    </View>
                </View>
            </View>
            {newSource.latitude && newDestination.latitude && (
                <View style={styles.footprint}>
                    <FootprintCard
                        distance={direction.distance}
                        duration={direction.duration}
                        onChangeTab={onChangeTab}
                        footprint={
                            direction.distance
                                ? tab <= 1
                                    ? calcCo2(getFuelRate(), direction.distance, getMileage())
                                    : 0
                                : null
                        }
                        tab={tab}
                        fetching={direction.isFetching}
                    />
                    <TouchableHighlight style={styles.cancelButton}>
                        <Icon
                            name={getIcon('close-circle')}
                            size={35}
                            style={{ color: color.primary }}
                            onPress={resetCoordHelper}
                        />
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
};

//StyleSheet
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 20,
        position: 'relative',
        justifyContent: 'flex-start'
    },
    footprint: {
        position: 'absolute',
        bottom: 50
    },
    cancelButton: {
        left: Dimensions.get('window').width / 2 - 10
    },
    button: {
        backgroundColor: color.primary,
        top: 0,
        zIndex: 2,
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 30 : 20
    },
    box: {
        borderBottomWidth: 1,
        borderColor: color.primary
    },
    icon: {
        color: color.grey
    },
    text: {
        color: color.white,
        fontSize: 14,
        letterSpacing: 1
    },
    buttonWrapper: {},
    center: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
});

export default Calculate;
