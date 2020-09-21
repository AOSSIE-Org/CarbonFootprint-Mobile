import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    Dimensions,
    ActivityIndicator,
    Share,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StatusBarBackground from '../components/StatusBarBackground';
// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color, newColors } from '../config/helper';
import { getProfile } from '../config/actionDispatcher';
import crashlytics from '@react-native-firebase/crashlytics';

const Stats = props => {
    const auth = useSelector(state => state.auth);
    const storage = useSelector(state => state.storage);
    const dispatch = useDispatch();
    const user = auth.user;
    const [backClickCount, setBackClickCount] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('handleBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('handleBackPress', handleBackPress);
    }, [backClickCount]);

    useEffect(() => {
        if (backClickCount) {
            ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackClickCount(false), 1000);
        }
    }, [backClickCount]);

    const handleBackPress = () => {
        if (backClickCount) {
            BackHandler.exitApp();
        } else {
            setBackClickCount(true);
        }
        return true;
    };

    const ShareMessage = msg => {
        Share.share({
            message: msg
        })
            .then(res => console.log(res))
            .catch(err => crashlytics().recordError(err));
    };

    const share = () => {
        ShareMessage(
            `I saved ${
                user && user.data && user.data.total && user.data.total.co2Saved
                    ? user.data.total.co2Saved.toFixed(2)
                    : 0.0
            } kg Co2. Analyse yours too, download the CarbonFootprint-Mobile app now play.google.com`
        );
    };

    const style = {
        backgroundColor: newColors.secondary
    };
    const rows = [
        [
            {
                activityType: 'walking',
                icon: 'walk',
                value: user && user.data && user.data.walking ? user.data.walking : {}
            },
            {
                activityType: 'running',
                icon: 'run',
                value: user && user.data && user.data.running ? user.data.running : {}
            }
        ],
        [
            {
                activityType: 'cycling',
                icon: 'bicycle',
                value: user && user.data && user.data.cycling ? user.data.cycling : {}
            },
            {
                activityType: 'vehicle',
                icon:
                    storage.data.automobile === 'Car'
                        ? 'car'
                        : storage.data.automobile === 'Bus'
                        ? 'bus'
                        : 'train',
                value: user && user.data && user.data.car ? user.data.car : {}
            }
        ]
    ];

    let scrollTabs = [
        {
            name: 'WALK',
            value: user && user.data && user.data.walking ? user.data.walking : {}
        },
        {
            name: 'RUN',
            value: user && user.data && user.data.running ? user.data.running : {}
        },
        {
            name: 'BIKE',
            value: user && user.data && user.data.cycling ? user.data.cycling : {}
        },
        {
            name: 'CAR',
            value: user && user.data && user.data.car ? user.data.car : {}
        }
    ];

    let totalStats = [
        [
            {
                id: 1,
                text: 'CO2 SAVED',
                number:
                    user && user.data && user.data.total && user.data.total.co2Saved
                        ? user.data.total.co2Saved.toFixed(2)
                        : 0,
                unit: 'kg',
                style: {
                    backgroundColor: 'rgba(0,0,0,0.09)'
                }
            },
            {
                id: 2,
                text: 'CO2 EMITTED',
                number: user && user.data ? user.data.total.footprint.toFixed(2) : 0,
                unit: 'kg'
            }
        ],
        [
            {
                id: 3,
                iconName: 'directions-run',
                number: user && user.data ? user.data.total.distance.toFixed(2) : 0.0,
                unit: 'km',
                style: {
                    marginBottom: 10
                }
            },
            {
                id: 4,
                iconName: 'access-time',
                number: user && user.data ? user.data.total.time : 0.0,
                unit: 'sec'
            }
        ]
    ];

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={newColors.secondary} />
            <StatusBarBackground style={style} />
            {auth.isFetching ? (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color={color.primary} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.topHeader}>
                            <Text style={styles.headingText}>Stats</Text>
                            <Icon name="share" size={24} style={styles.shareIcon} onPress={share} />
                        </View>
                        <View style={styles.totalStatsWrapper}>
                            <View style={styles.bigStatsWrapper}>
                                {totalStats[0].map(obj => {
                                    return (
                                        <View
                                            style={[styles.bigStatsItemWrapper, obj.style || {}]}
                                            key={obj.id}
                                        >
                                            <Text style={styles.number}>
                                                {obj.number}
                                                <Text style={styles.numberUnit}>
                                                    {' ' + obj.unit}
                                                </Text>
                                            </Text>
                                            <Text style={styles.text}>{obj.text}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            <View style={styles.smallStatsWrapper}>
                                {totalStats[1].map(obj => {
                                    return (
                                        <View
                                            style={[styles.smallStatsItemWrapper, obj.style || {}]}
                                            key={obj.id}
                                        >
                                            <Icon
                                                name={obj.iconName}
                                                size={20}
                                                style={styles.smallStatsIcon}
                                            />
                                            <Text style={styles.smallText}>
                                                {obj.number + ' ' + obj.unit}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                    <ScrollableTabView
                        tabBarBackgroundColor={newColors.secondary}
                        tabBarActiveTextColor="white"
                        tabBarInactiveTextColor="white"
                        style={styles.scrollTabView}
                        tabBarTextStyle={styles.tabText}
                        tabBarUnderlineStyle={styles.tabLine}
                    >
                        {scrollTabs.map(obj => {
                            let distance = obj.value.distance ? obj.value.distance.toFixed(2) : 0.0;
                            let footprint = obj.value.footprint
                                ? obj.value.footprint.toFixed(2)
                                : 0.0;
                            let time = obj.value.time ? obj.value.time : 0.0;
                            return (
                                <ScrollView
                                    contentContainerStyle={styles.contentItemWrapper}
                                    tabLabel={obj.name}
                                    key={obj.name}
                                >
                                    <View style={styles.footprintWrapper}>
                                        {/* <View style={styles.plusWrapper}><Text style={styles.plus}>+</Text></View> */}
                                        <Icon
                                            name="add-circle"
                                            size={28}
                                            color="rgba(255,255,255,0.5)"
                                            style={styles.plusIcon}
                                        />
                                        <Text style={styles.footprintNumber}>{footprint}</Text>
                                        <Text style={styles.kgText}>KILOGRAM</Text>
                                    </View>
                                    <View style={styles.attributesWrapper}>
                                        <View style={styles.innerAttr}>
                                            <Icon name="send" size={24} style={styles.iconSmall} />
                                            <Text style={styles.belowIcon}>{distance + ' km'}</Text>
                                            <Text style={styles.bbelowIcon}>DISTANCE</Text>
                                        </View>
                                        <View style={styles.innerAttr}>
                                            <Icon
                                                name="av-timer"
                                                size={24}
                                                style={styles.iconSmall}
                                            />
                                            <Text style={styles.belowIcon}>{time + ' sec'}</Text>
                                            <Text style={styles.bbelowIcon}>TIME</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            );
                        })}
                    </ScrollableTabView>
                </ScrollView>
            )}
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: newColors.secondary
    },
    main: {
        flex: 1
    },
    header: {
        // flex: 0.4,
        alignItems: 'center'
        // justifyContent: 'center',
    },
    contentItemWrapper: {
        // backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
        // borderWidth: 0,
        // borderTopWidth: 1,
        // borderColor: 'white'
    },
    footprintWrapper: {
        marginTop: -40,
        marginBottom: 40,
        alignItems: 'center',
        position: 'relative'
    },
    plusIcon: {
        position: 'absolute',
        left: -40,
        top: 60,
        color: newColors.primary
    },
    // plus:{
    //     color: 'white'
    // },
    innerAttr: {
        alignItems: 'center'
    },
    tabLine: {
        backgroundColor: 'white'
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
        width: Dimensions.get('window').width * 0.9
    },
    belowIcon: {
        color: newColors.primary,
        fontSize: 32,
        fontFamily: 'Poppins-SemiBold'
    },
    bbelowIcon: {
        color: newColors.primary,
        fontSize: 14,
        marginTop: -5,
        fontFamily: 'Poppins-SemiBold'
    },
    scrollTabView: {
        marginTop: 20,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 0,
        borderTopWidth: 1
    },
    smallStatsItemWrapper: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.09)',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        paddingVertical: 7,
        paddingLeft: 20
    },
    bigStatsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
        flex: 0.8,
        marginLeft: Dimensions.get('window').width * 0.1
    },
    footprintNumber: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 100,
        color: newColors.primary
        // fontStyle: 'italic'
    },
    kgText: {
        fontFamily: 'Poppins-Black',
        fontSize: 16,
        // marginTop: Platform.OS == 'android' ? -50 : -20,
        // lineHeight: 16,
        color: newColors.primary
        // fontStyle: 'italic'
    },
    bigStatsItemWrapper: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
        // color: 'white'
        // backgroundColor
    },
    number: {
        fontFamily: 'Poppins-Light',
        fontSize: 30,
        color: 'white'
    },
    numberUnit: {
        fontSize: 14
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: newColors.white
    },
    smallText: {
        paddingHorizontal: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: newColors.white
    },
    smallStatsWrapper: {
        // alignItems: 'center'
    },

    totalStatsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginTop: 10
    },
    headingText: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: newColors.white
    },
    attributesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width * 0.8
    },
    iconHeader: {
        marginBottom: 5
    },
    content: {
        flex: 1
    },
    largeText: {
        fontSize: 13,
        letterSpacing: 1,
        color: color.black,
        marginTop: 8,
        marginBottom: 4
    },
    row: {
        borderColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.3
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 0.5,
        justifyContent: 'center',
        borderColor: '#ddd'
    },
    rowBottom: {
        borderBottomWidth: 1
    },
    columnBorder: {
        borderLeftWidth: 1
    },
    largeInfo: {
        fontSize: 18,
        letterSpacing: 1,
        color: '#31db0f'
    },
    emittedCo2: {
        fontSize: 18,
        letterSpacing: 1,
        color: '#e01702'
    },
    columnInfo: {
        marginTop: 10
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteText: {
        color: color.white
    },
    largeHeaderText: {
        fontSize: 16,
        zIndex: 3,
        fontWeight: '600'
    },
    smallHeaderText: {
        fontSize: 13,
        zIndex: 3,
        fontWeight: '700',
        color: color.grey
    },
    shareStyle: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    iconSmall: {
        color: newColors.primary
    },
    shareIcon: {
        color: newColors.white
    },
    smallStatsIcon: {
        color: newColors.white
    }
});

export default React.memo(Stats);
