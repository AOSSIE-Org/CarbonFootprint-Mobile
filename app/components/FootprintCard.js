import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Platform,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon, color } from '../config/helper';

class FootprintCard extends Component {
    render() {
        const tabs = [
            {
                value: 0,
                icon: "car",
            },
            {
                value: 1,
                icon: "bus",
            },
            {
                value: 2,
                icon: "bicycle",
            },
            {
                value: 3,
                icon: "walk",
            }
        ];
        let props = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.tabs}>
                    {
                        tabs.map((item) =>
                            <TouchableHighlight style={[
                                props.tab === item.value ?
                                styles.tab: null, styles.tabWidth
                            ]} onPress={() => props.onChangeTab(item.value)}
                            key={item.value} underlayColor={color.white} activeOpacity={0.5}>
                                <Icon name={getIcon(item.icon)} size={20} color={color.black} />
                            </TouchableHighlight>
                        )
                    }
                </View>
                {
                    props.fetching ?
                    <View style={styles.center}>
                        <ActivityIndicator size="small" />
                    </View>
                    :
                    <View style={styles.tabContent}>
                        <View style={styles.routeContent}>
                            {
                                props.distance.text ?
                                null:
                                <Text style={styles.error}>
                                    Sorry!!! No straight route available
                                    between source and destination
                                </Text>
                            }
                            <Text style={styles.route}>
                                {
                                    props.distance.text ?
                                    props.distance.text:
                                    null
                                }
                            </Text>
                            <Text style={styles.route}>
                                {
                                    props.duration.text ?
                                    props.duration.text:
                                    null
                                }
                            </Text>
                        </View>
                        {
                            props.distance.text ?
                            <View style={styles.footprintContent}>
                                <Text style={styles.footprint}>
                                    {
                                        props.footprint !== null ?
                                        props.footprint.toFixed(2) + " kg":
                                        null
                                    }
                                </Text>
                            </View>
                            : null
                        }
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: color.greyBack,
        bottom: 45,
        position: 'absolute',
        padding: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        borderColor: color.black,
        borderBottomWidth: 2,
    },
    tabWidth: {
        width: 25,
        alignItems: 'center',
    },
    tabContent: {
        padding: 5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 90,
    },
    routeContent: {
        justifyContent: 'center',
    },
    footprintContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    route: {
        fontSize: 14,
        color: color.black,
    },
    footprint: {
        fontSize: 16,
        color: color.black,
        fontWeight: '500',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    },
    error: {
        color: color.error,
        textAlign: 'center',
    }
})

export default FootprintCard;
