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

class FootprintCard extends Component {
    getIcon(icon) {
        return Platform.OS === "android" ?
            "md-" + icon : "ios-" + icon
    }

    render() {
        const tabs = [
            {
                value: 0,
                icon: this.getIcon("car"),
            },
            {
                value: 1,
                icon: this.getIcon("bus"),
            },
            {
                value: 2,
                icon: this.getIcon("bicycle")
            },
            {
                value: 3,
                icon: this.getIcon("walk")
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
                            key={item.value} underlayColor="#fff" activeOpacity={0.5}>
                                <Icon name={item.icon} size={20} color="#4D72B8" />
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
                            <Text style={styles.route}>
                                {
                                    props.distance.text ?
                                    props.distance.text:
                                    "Sorry!!! No Straight Route available for this place"
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
                        <View style={styles.footprintContent}>
                            <Text style={styles.footprint}>
                                160g CO2
                            </Text>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: '#fff',
        bottom: 45,
        position: 'absolute',
        padding: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        // This is blue shade in Carbon Footprint logo
        borderColor: "#4D72B8",
        borderBottomWidth: 2,
    },
    tabWidth: {
        width: 20,
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
    },
    footprint: {
        fontSize: 18,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    }
})

export default FootprintCard;
