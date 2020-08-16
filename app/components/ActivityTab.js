/*
 * To show current user activity
 */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';

// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import pick from 'lodash/pick';
import {
    getIcon,
    getIconName,
    color,
    calcCo2,
    getMileage,
    getFuelRate,
    checkGPS
} from '../config/helper';

import { getPermission } from '../actions/LocationAction';
import haversine from 'haversine';
import { mapboxKey } from '../config/keys';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import {
    startActivityDetection,
    closeActivityDetection,
    setCO2,
    setDest,
    setDistance,
    setSrc
} from '../config/actionDispatcher';
import MapboxGL from '@react-native-mapbox-gl/maps';
import crashlytics from '@react-native-firebase/crashlytics';

MapboxGL.setAccessToken(mapboxKey);

const ActivityTab = props => {
    const dispatch = useDispatch();
    const [numCoords, setNumCoords] = useState(0);
    const [routeCoordinates, setRouteCoordinates] = useState({
        coordinates: [],
        type: 'LineString'
    });
    const [prevLatLng, setPrevLatLng] = useState({});
    const activity = useSelector(state => state.activity);
    var watchID;

    useEffect(() => {
        dispatch(startActivityDetection());
        return () => {
            closeActivityDetection();
            // Stop getting location updates
            Geolocation.clearWatch(watchID);
        };
    }, []);

    useEffect(() => {
        const getLocation = async () => {
            let value = true;
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                value = await getPermission();
                checkGPS();
            }
            if ((value && Platform.OS === 'android') || Platform.OS === 'ios') {
                Geolocation.getCurrentPosition(
                    position => {
                        const currLatLngs = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        setSrc(currLatLngs);
                    },
                    error => {
                        crashlytics().log('Error while getting location' + error.message);
                    }
                );
                /**
                 * Getting location updates (Only when location changes
                 */
                watchID = Geolocation.watchPosition(
                    position => {
                        const newLatLngs = {
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude
                        };
                        const positionLatLngs = pick(position.coords, ['longitude', 'latitude']);

                        if (
                            activity.type !== 'STILL' &&
                            activity.type !== 'TILTING' &&
                            activity.type !== 'UNKNOWN'
                        ) {
                            dispatch(
                                setDistance(
                                    activity.distance + calcDistance(prevLatLng, newLatLngs)
                                )
                            );
                            dispatch(
                                setCO2(
                                    calcCo2(
                                        getFuelRate(),
                                        activity.distance.toString(),
                                        getMileage()
                                    )
                                )
                            );
                            dispatch(setDest(newLatLngs));
                            setRouteCoordinates({
                                coordinates: routeCoordinates.coordinates.concat(positionLatLngs)
                            });
                            setPrevLatLng(newLatLngs);
                        }
                    },
                    error => {
                        crashlytics().log(error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 1000,
                        maximumAge: 0,
                        distanceFilter: 1
                    }
                );
            }
        };
        getLocation();
    }, []);

    /**
     * Calculating traveled distance at runtime using Haversine formula
     * @param  jsonobject prevLatLng prev latitude and longitude
     * @param  jsonobject newLatLng  new latitude and longitude
     * @return haversine formula
     */
    const calcDistance = (prevLatLng, newLatLng) => {
        return haversine(prevLatLng, newLatLng) || 0;
    };

    /**
     * Calculating total activity time interms of hours,minutes and seconds
     * @param   duration total duration of activity
     * @return time  interms of hours , minutes and seconds
     */
    const updateTime = duration => {
        if (duration < 60) {
            return { time: duration, unit: 's' };
        } else {
            if (duration >= 60 && duration <= 3600)
                return { time: (duration / 60).toFixed(1), unit: 'min' };
            else return { time: (duration / 3600).toFixed(1), unit: 'hr' };
        }
    };

    /**
     * Getting current location (One-time only)
     * @return Promise updating current location
     */
    /**
     * lifecycle method called only one time before initial render
     * @return updating props to start activity detection
     */

    const layerStyle = {
        route: {
            lineColor: 'black',
            lineCap: 'round',
            lineWidth: 4,
            lineOpacity: 0.64
        }
    };

    let icon = getIconName(activity.type);
    let timeObj = updateTime(activity.duration);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.mapView}>
                <MapboxGL.MapView style={styles.mapView}>
                    <MapboxGL.Camera followZoomLevel={15} followUserLocation />
                    <MapboxGL.UserLocation />
                    <MapboxGL.ShapeSource id="routeSource" shape={routeCoordinates}>
                        <MapboxGL.LineLayer
                            id="routeFill"
                            style={layerStyle.route}
                            layerIndex={100}
                        />
                    </MapboxGL.ShapeSource>
                </MapboxGL.MapView>
                <TouchableOpacity style={styles.currentLocationButton}>
                    <Icon name={getIcon('locate')} size={22} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.activityView}>
                    <View style={styles.activity_icon}>
                        {activity.type === 'RUNNING' ? (
                            <Icon1 name={icon} size={50} color="white" />
                        ) : (
                            <Icon name={getIcon(icon)} size={50} color="white" />
                        )}
                    </View>
                    <Text style={styles.smallText}> Detected Activity </Text>
                    <View style={styles.hrline} />
                </View>
                <View style={styles.dashboardView}>
                    <View style={styles.dashboardViewItems}>
                        <View style={styles.dashboardViewItems1}>
                            <Text style={styles.largeText}>{activity.distance.toFixed(2)}</Text>
                            <Text style={styles.smallText}>km</Text>
                        </View>
                        <Text style={styles.smallText}>Travel distance</Text>
                    </View>
                    <View style={styles.verline} />
                    <View style={styles.dashboardViewItems}>
                        <View style={styles.dashboardViewItems1}>
                            <Text style={styles.largeText}>
                                {activity == 'IN_VEHICLE' ? activity.co2.toFixed(2) : '0.00'}
                            </Text>
                            <Text style={styles.smallText}>kg</Text>
                        </View>
                        <View style={styles.hrView}>
                            <Text style={styles.smallText}>CO</Text>
                            <Text style={styles.subText}>2</Text>
                            <Text style={styles.smallText}> emitted</Text>
                        </View>
                    </View>
                    <View style={styles.verline} />
                    <View style={styles.dashboardViewItems}>
                        <View style={styles.dashboardViewItems1}>
                            <Text style={styles.largeText}>{timeObj.time}</Text>
                            <Text style={styles.smallText}>{timeObj.unit}</Text>
                        </View>
                        <Text style={styles.smallText}>Travel time</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

/* StyleSheet */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    mapView: {
        height: Dimensions.get('window').height * 0.45,
        width: Dimensions.get('window').height
    },
    scrollView: {
        height: Dimensions.get('window').height * 0.9
    },
    activityView: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dashboardView: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    activity_icon: {
        marginTop: 10,
        height: 80,
        borderRadius: 40,
        width: 80,
        backgroundColor: color.primary,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    hrline: {
        width: 325,
        height: 1,
        borderColor: '#f5f5f5',
        borderWidth: 1
    },
    hrView: {
        flexDirection: 'row'
    },
    dashboardViewItems: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dashboardViewItems1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    verline: {
        width: 1,
        height: 80,
        borderColor: '#f5f5f5',
        borderWidth: 1,
        paddingBottom: 13
    },
    smallText: {
        paddingBottom: 13,
        fontSize: 12,
        color: '#78909c'
    },
    largeText: {
        paddingRight: 5,
        fontSize: 45,
        color: '#37474f'
    },
    subText: {
        fontSize: 9,
        paddingTop: 4
    },
    currentLocationButton: {
        backgroundColor: '#efefef',
        height: 35,
        width: 35,
        position: 'absolute',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        elevation: 3,
        borderRadius: 2
    }
});

export default ActivityTab;
