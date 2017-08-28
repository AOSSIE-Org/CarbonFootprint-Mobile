import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    StatusBar,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import * as ProfileAction from '../actions/ProfileAction';

import Header from '../components/Header';
import images from '../config/images';
import { getIcon, color } from '../config/helper';

class Stats extends Component {
    componentWillMount() {
        this.props.getProfile();
    }

    render() {
        const auth = this.props.auth;
        const user = auth.user;
        const rows = [
            [
                {
                    title: "Walking",
                    icon: "walk",
                    value: user.data?
                        (user.data.walking ?
                            user.data.walking : {}
                        ): {},
                },
                {
                    title: "Running",
                    icon: "run",
                    value: user.data ?
                        (user.data.running ?
                            user.data.running : {}
                        ): {}
                }
            ],
            [
                {
                    title: "Cycling",
                    icon: "bicycle",
                    value: user.data ?
                        (user.data.cycling ?
                            user.data.cycling : {}
                        ): {}
                },
                {
                    title: "Vehicle",
                    icon: this.props.storage.automobile === "Car"? "car": (this.props.storage.automobile === "Bus"? "bus": "train"),
                    value: user.data?
                        (user.data.driving ?
                            user.data.driving : {}
                        ): {}
                }
            ]
        ]
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
                {
                    auth.isFetching ?
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color={color.primary} />
                    </View>
                    :
                    <ScrollView contentContainerStyle={styles.main}>
                        <View style={styles.header}>
                            <Icon name={getIcon("analytics")} size={56} color={color.white} style={styles.iconHeader} />
                            <Text style={[styles.largeInfo, styles.whiteText]}>
                                {
                                    user.data?
                                    user.data.total.footprint
                                    :"0g CO2"
                                }
                            </Text>
                            <Text style={[styles.smallText, styles.whiteText]}>
                                {
                                    user.data?
                                    user.data.total.distance
                                    :"0 km"
                                }
                            </Text>
                            <Text style={[styles.smallText, styles.whiteText]}>
                                {
                                    user.data?
                                    user.data.total.time
                                    : "0 sec"
                                }
                            </Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.content}>
                            {
                                rows.map((row, index) => {
                                    let rowStyle = [styles.row];
                                    if ((rows.length - 1) === index) {
                                        rowStyle.push(styles.rowBottom);
                                    }
                                    return (
                                        <View style={rowStyle} key={index}>
                                            {
                                                row.map((column, i) => {
                                                    let columnStyle = [styles.column];
                                                    if (i === 1) {
                                                        columnStyle.push(styles.columnBorder);
                                                    }
                                                    return (
                                                        <View style={columnStyle} key={i}>
                                                        {
                                                            column.icon === "run"?<Icon1 name={column.icon} size={32} color={color.darkPrimary} />: <Icon name={getIcon(column.icon)} size={32} color={color.darkPrimary} />
                                                        } 
                                                            <View style={styles.columnInfo}>
                                                                <Text style={styles.largeInfo}>
                                                                    {
                                                                        column.value.footprint ?
                                                                        column.value.footprint : "0g CO2"
                                                                    }
                                                                </Text>
                                                                <Text style={styles.smallText}>
                                                                    {
                                                                        column.value.time ?
                                                                        column.value.time : "0 sec"
                                                                    }
                                                                </Text>
                                                                <Text style={styles.smallText}>
                                                                    {
                                                                        column.value.distance ?
                                                                        column.value.distance: "0 km"
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.greyBack,
    },
    main: {
        flex: 1,
    },
    header: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primary,
        paddingTop: 20,
    },
    iconHeader: {
        marginBottom: 5,
    },
    content: {
        flex: 0.6,
    },
    largeText: {
        fontSize: 13,
        letterSpacing: 1,
        color: color.black,
        marginTop: 8,
        marginBottom: 4,
    },
    smallText: {
        fontSize: 11,
        letterSpacing: 1,
        color: color.black,
        marginTop: 4,
        textAlign: 'center',
    },
    row: {
        borderColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.3,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 0.5,
        justifyContent: 'center',
        borderColor: '#ddd',
    },
    rowBottom: {
        borderBottomWidth: 1,
    },
    columnBorder: {
        borderLeftWidth: 1,
    },
    largeInfo: {
        fontSize: 18,
        letterSpacing: 1,
        color: color.black,
    },
    columnInfo: {
        marginTop: 10
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteText: {
        color: color.white,
    },
    largeHeaderText: {
        fontSize: 16,
        zIndex: 3,
        fontWeight: '600',
    },
    smallHeaderText: {
        fontSize: 13,
        zIndex: 3,
        fontWeight: '700',
        color: color.grey,
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, ProfileAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
