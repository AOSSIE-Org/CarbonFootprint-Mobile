import React, { Component } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    Platform,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import StatusBarBackground from '../components/StatusBarBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import images from '../config/images';
import ProfileHeader from '../components/ProfileHeader';
import ProfileModal from '../containers/ProfileModal';

import * as AuthAction from '../actions/AuthAction';

import { color, newColors } from '../config/helper';
import NotificationsModal from './NotificationsModal';

/**
 * More Screen container
 * @extends Component
 */
class More extends Component {
    state = {
        picture: this.props.user.picture ? this.props.user.picture : images.logo,
        modalVisible: false,
        notificationsModalVisible: false
    };

    /**
     *  This function provides options for adding incident image, and updates the image object.
     * @return updates the incident image.
     */
    _cameraImage = () => {
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
                    this.setState({
                        picture: response.data
                    });
                    Toast.show('Image added');
                }
            }
        });
    };

    logout = () => {
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
                    onPress: () => this.props.logout()
                }
            ],
            { cancelable: true }
        );
    };

    modalToggle = key => {
        this.setState(prevState => ({
            [key]: !prevState[key]
        }));
    };

    render() {
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
                <NotificationsModal
                    visible={this.state.notificationsModalVisible}
                    modalToggle={this.modalToggle}
                />
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
                            this.setState({ notificationsModalVisible: true });
                        }}
                    />
                </View>

                <View style={styles.mainWrapper}>
                    <ProfileModal
                        visible={this.state.modalVisible}
                        modalToggle={this.modalToggle}
                    />

                    <View style={styles.profileWrapper}>
                        <View style={styles.profileGroup}>
                            <View style={styles.leftWrapper}>
                                <View style={styles.imageWrapper}>
                                    {/* <Image source={require('../../assets/images/pic.jpg')} style={styles.avatar} /> */}
                                    {this.state.picture == images.logo ? (
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
                                                uri: 'data:image/png;base64,' + this.state.picture
                                            }}
                                        />
                                    )}
                                    <View style={styles.cameraIconWrapper}>
                                        <MIcon
                                            name="camera"
                                            size={15}
                                            onPress={this._cameraImage}
                                            style={styles.cameraIcon}
                                            color="white"
                                        />
                                    </View>
                                </View>
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.nameText}>
                                        {this.props.user.name.trim()}
                                    </Text>
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
                                    onPress={() => this.setState({ modalVisible: true })}
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
                            {settingsList.map((element, i) => {
                                return (
                                    <View>
                                        <TouchableHighlight
                                            onPress={element.link}
                                            activeOpacity={0.5}
                                            underlayColor="#eee"
                                            key={i}
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
                            <TouchableHighlight style={styles.signWrapper} onPress={this.logout}>
                                <Text style={styles.signText}>Sign Out</Text>
                            </TouchableHighlight>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
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

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
    user: state.auth.user
    // updateLoading: state.login.loading
});

/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

More.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(More);
