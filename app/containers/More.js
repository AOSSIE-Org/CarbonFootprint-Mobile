import React, { useState, useEffect } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import StatusBarBackground from '../components/StatusBarBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import images from '../config/images';
import ProfileHeader from '../components/ProfileHeader';
import ProfileModal from '../containers/ProfileModal';
import Toast from 'react-native-simple-toast';
import { color, newColors } from '../config/helper';
import NotificationsModal from './NotificationsModal';
import { logout } from '../config/actionDispatcher';

const More = props => {
    const user = useSelector(state => state.auth.user);
    const [picture, setPicture] = useState(user.picture ? user.picture : images.logo);
    const [modalVisible, setModalVisible] = useState(false);
    const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const [backClickCount, setBackClickCount] = useState(false);

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

    /**
     *  This function provides options for adding incident image, and updates the image object.
     * @return updates the incident image.
     */
    const _cameraImage = () => {
        let options = {
            title: 'Select Option',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                Toast.show('Image Pick Error');
            } else if (response.didCancel) {
            } else if (response.customButton) {
                Toast.show('User Tapped Custom Button');
            } else {
                if (response.fileSize > 500000) {
                    Toast.show('Size of image should be less than 500KB');
                } else {
                    setPicture(response.data);
                    Toast.show('Image added');
                }
            }
        });
    };

    const userLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => dispatch(logout())
                }
            ],
            { cancelable: true }
        );
    };

    const modalToggle = key => {
        if (key === 'modalVisible') {
            if (modalVisible == true) {
                setModalVisible(false);
            } else {
                setModalVisible(true);
            }
        } else {
            if (notificationsModalVisible === true) {
                setNotificationsModalVisible(false);
            } else {
                setNotificationsModalVisible(true);
            }
        }
    };

    const style = {
        backgroundColor: newColors.secondary
    };

    let settingsList = [
        {
            icon: 'settings',
            text: 'Settings',
            link: () => Actions.settings()
        },
        {
            icon: 'history',
            text: 'History',
            link: () => Actions.timeline()
        },
        {
            icon: 'info',
            text: 'About CarbonFootprint',
            link: () => Actions.about()
        },
        {
            icon: 'note',
            text: 'Terms And Conditions',
            link: () => Actions.terms()
        }
    ];

    let links = [
        {
            name: 'friends',
            number: '1.2k',
            text: 'FRIENDS'
        },
        {
            name: 'co2saved',
            number: '832g',
            text: 'CO2 SAVED'
        },
        {
            name: 'co2saved',
            number: '832g',
            text: 'CO2 SAVED'
        }
    ];

    return (
        <View style={styles.container}>
            <NotificationsModal visible={notificationsModalVisible} modalToggle={modalToggle} />
            <StatusBar backgroundColor={newColors.secondary} barStyle="dark-content" />
            <StatusBarBackground style={style} />
            <View style={styles.header}>
                <ProfileHeader text="Profile" />
                <Icon
                    name="bell"
                    size={20}
                    style={{
                        paddingRight: 20,
                        color: newColors.white
                    }}
                    onPress={() => {
                        setNotificationsModalVisible(true);
                    }}
                />
            </View>
            <View style={styles.mainWrapper}>
                <ProfileModal visible={modalVisible} modalToggle={modalToggle} />
                <View style={styles.profileWrapper}>
                    <View style={styles.profileGroup}>
                        <View style={styles.leftWrapper}>
                            <View style={styles.imageWrapper}>
                                {/* <Image source={require('../../assets/images/pic.jpg')} style={styles.avatar} /> */}
                                {picture == images.logo ? (
                                    <Image
                                        style={styles.avatar}
                                        resizeMethod={'resize'}
                                        source={images.logo}
                                    />
                                ) : (
                                    <Image
                                        style={styles.avatar}
                                        resizeMethod={'resize'}
                                        source={{
                                            uri: 'data:image/png;base64,' + picture
                                        }}
                                    />
                                )}
                                <View style={styles.cameraIconWrapper}>
                                    <MIcon
                                        name="camera"
                                        size={15}
                                        onPress={_cameraImage}
                                        style={styles.cameraIcon}
                                        color="white"
                                    />
                                </View>
                            </View>
                            <View style={styles.nameWrapper}>
                                <Text style={styles.nameText}>{user.name.trim()}</Text>
                                {/* <View style={styles.locationWrapper}>
                                    <MIcon name="room" color="black" size={20} />
                                    <Text style={styles.locationText}>New Delhi, India</Text>
                                </View> */}
                            </View>
                        </View>
                        <View style={styles.editWrapper}>
                            <MIcon
                                name="edit"
                                size={16}
                                color="white"
                                onPress={() => setModalVisible(true)}
                                style={styles.editIcon}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.descWrapper}>
                        <Text style={styles.descText}>
                            A learner who want to create stuff now.Also, Interested in sports
                            and yes.
                        </Text>
                    </View> */}
                </View>
                <View style={styles.settingsWrapper}>
                    <ScrollView>
                        {/* <Text style={styles.generalText}>General</Text> */}
                        {settingsList.map(element => {
                            return (
                                <View key={element.text}>
                                    <TouchableHighlight
                                        onPress={element.link}
                                        activeOpacity={0.5}
                                        underlayColor="#eee"
                                    >
                                        <View style={styles.itemWrapper}>
                                            <Text style={styles.itemText}>{element.text}</Text>
                                            <MIcon
                                                name={element.icon}
                                                size={24}
                                                // backgroundColor='#9D9D9D'
                                                color={newColors.black}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                    <View style={styles.lineStyle} />
                                </View>
                            );
                        })}
                        <TouchableHighlight style={styles.signWrapper} onPress={userLogout}>
                            <Text style={styles.signText}>Sign Out</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: newColors.secondary
    },
    mainWrapper: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: Dimensions.get('window').width,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileWrapper: {},
    profileGroup: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftWrapper: {
        flexDirection: 'row'
    },
    settingsWrapper: {
        flex: 1,
        marginTop: 20
    },
    group: {
        marginTop: 20,
        width: Dimensions.get('window').width
    },
    imageWrapper: {
        width: 60,
        height: 60,
        position: 'relative'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover'
    },
    nameWrapper: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    nameText: {
        fontFamily: 'Poppins',
        fontSize: 20
    },
    locationText: {
        fontFamily: 'Poppins',
        // fontSize:
        alignItems: 'center'
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    descWrapper: {
        marginTop: 10,
        alignItems: 'center'
    },
    descText: {
        width: '90%',
        fontFamily: 'Poppins'
    },
    signWrapper: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#bd4b4b',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    signText: {
        width: Dimensions.get('window').width * 0.9,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins-Bold',
        paddingVertical: 10
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: -5,
        padding: 5,
        borderRadius: 50,
        backgroundColor: 'black'
    },
    horizontalScrollWrapper: {
        marginTop: 10,
        marginLeft: 10
    },
    linkWrapper: {
        marginRight: 20,
        borderColor: newColors.black,
        borderRadius: 3,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    linkNumber: {
        fontFamily: 'Muli-Bold',
        fontSize: 28,
        color: newColors.black
    },
    linkText: {
        color: '#9D9D9D',
        fontFamily: 'Muli',
        fontSize: 20,
        paddingLeft: 5
    },
    button: {
        flexDirection: 'row',
        paddingLeft: 13,
        alignItems: 'center',
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        height: 50
    },
    editWrapper: {
        padding: 5,
        backgroundColor: 'black',
        borderRadius: 50
    },
    icon: {
        marginRight: 10
    },
    generalText: {
        width: Dimensions.get('window').width,
        color: '#9D9D9D',
        paddingVertical: 10,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: 'rgba(215,215,215,0.5)',
        fontFamily: 'Muli-Bold'
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    itemText: {
        fontFamily: 'Poppins-SemiBold',
        color: newColors.black,
        fontSize: 16
    },
    text: {
        fontSize: 14,
        color: color.black,
        letterSpacing: 1
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: newColors.secondary,
        margin: 10
    }
});

export default React.memo(More);
