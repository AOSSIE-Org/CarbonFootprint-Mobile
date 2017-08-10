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
import Icon from 'react-native-vector-icons/Ionicons';

import * as ProfileAction from '../actions/ProfileAction';

import Header from '../components/Header';
import images from '../config/images';
import { getIcon } from '../config/helper';

class Profile extends Component {
    componentWillMount() {
        this.props.getProfile();
    }

    render() {
        const auth = this.props.auth;
        const user = auth.user;
        const rows = [
            [
                {
                    title: "Driving",
                    icon: "car",
                    value: user.data?
                        (user.data.driving ?
                            user.data.driving : {}
                        ): {}
                },
                {
                    title: "Transit",
                    icon: "bus",
                    value: user.data ?
                        (user.data.transit ?
                            user.data.transit : {}
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
                    title: "Walking/Running",
                    icon: "walk",
                    value: user.data?
                        (user.data.walking ?
                            user.data.walking : {}
                        ): {},
                }
            ]
        ]
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {
                    auth.isFetching ?
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#4D72B8" />
                    </View>
                    :
                    <ScrollView contentContainerStyle={styles.main}>
                        <Image style={styles.header} source={images.background}>
                            {
                                user.picture ?
                                <Image source={{uri: user.picture}} style={styles.image} />
                                :
                                <Image source={images.noImage} style={styles.image} />
                            }
                            <Text style={[styles.largeText, styles.whiteText, styles.largeHeaderText]}>{user.name}</Text>
                            <Text style={[styles.smallText, styles.whiteText, styles.smallHeaderText]}>{user.email}</Text>
                        </Image>
                        <View style={styles.content}>
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
                                                            <Icon name={getIcon(column.icon)} size={32} color="#538124" />
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
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    main: {
        flex: 1,
    },
    header: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: null,
        height: null,
    },
    content: {
        flex: 0.7,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: "#eee",
    },
    largeText: {
        fontSize: 13,
        letterSpacing: 1,
        color: "#444",
        marginTop: 8,
        marginBottom: 4,
    },
    smallText: {
        fontSize: 11,
        letterSpacing: 1,
        color: "#666",
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
        color: "#444",
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
        color: "#fff",
    },
    largeHeaderText: {
        fontSize: 16,
        zIndex: 3,
        fontWeight: 'bold',
    },
    smallHeaderText: {
        fontSize: 15,
        zIndex: 3,
        fontWeight: 'bold',
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, ProfileAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
