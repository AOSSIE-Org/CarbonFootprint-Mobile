import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import { getIcon, color, newColors } from '../config/helper';

/**
 * card component to show co2 released vechile type and other details after selecting route
 * @param  props properties from parent classs
 */
const FootprintCard = props => {
    const tabs = [
        {
            value: 0,
            icon: 'car'
        },
        {
            value: 1,
            icon: 'bus'
        },
        {
            value: 2,
            icon: 'bicycle'
        },
        {
            value: 3,
            icon: 'walk'
        }
    ];

    const showDuration = () => {
        if (props.duration < 60) {
            return props.duration.toFixed(2) + ' sec';
        } else if (props.duration < 3600) {
            return (props.duration / 60).toFixed(2) + ' min';
        }
        return (props.duration / 3600).toFixed(2) + ' hr';
    };

    const renderFootprint = () => {
        if (props.distance) {
            return (
                <View style={styles.tabContent}>
                    <View style={styles.footprintContent}>
                        <FontAwesome5 name="route" size={28} style={{ color: newColors.primary }} />
                        <Text style={styles.route}> {(props.distance / 1000).toFixed(2)} km </Text>
                    </View>
                    <View style={styles.footprintContent}>
                        <Ionicons
                            name={getIcon('time')}
                            size={28}
                            style={{ color: newColors.primary }}
                        />
                        <Text style={styles.route}>{showDuration()}</Text>
                    </View>
                    <View style={styles.footprintContent}>
                        <Foundation name="foot" size={28} style={{ color: newColors.primary }} />
                        <Text style={styles.route}>
                            {props.footprint ? props.footprint.toFixed(2) + ' kg' : 'N/A'}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.tabContent}>
                    <Text style={styles.error}>
                        Sorry!!! No straight route available between source and destination
                    </Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {tabs.map(item => (
                    <TouchableHighlight
                        style={[props.tab === item.value ? styles.tab : null, styles.tabWidth]}
                        onPress={() => props.onChangeTab(item.value)}
                        key={item.value}
                        underlayColor={color.white}
                        activeOpacity={0.5}
                    >
                        <Ionicons name={getIcon(item.icon)} size={20} color={color.black} />
                    </TouchableHighlight>
                ))}
            </View>
            {props.fetching ? (
                <View style={styles.center}>
                    <ActivityIndicator size="small" />
                </View>
            ) : (
                renderFootprint()
            )}
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 12,
        backgroundColor: color.grey,
        bottom: 30,
        position: 'absolute',
        padding: 5,
        margin: 5,
        borderRadius: 10,
        borderColor: newColors.primary,
        borderWidth: 3
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tab: {
        borderColor: color.black,
        borderBottomWidth: 2
    },
    tabWidth: {
        width: 25,
        alignItems: 'center'
    },
    tabContent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        height: 90
    },
    cancelButton: {
        left: Dimensions.get('window').width - 50
    },
    routeContent: {
        justifyContent: 'center'
    },
    footprintContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    route: {
        marginTop: 5,
        fontSize: 15,
        color: color.black,
        fontWeight: 'bold'
    },
    footprint: {
        fontSize: 16,
        color: color.black,
        fontWeight: '500'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    },
    error: {
        color: color.error,
        textAlign: 'center'
    }
});

export default FootprintCard;
