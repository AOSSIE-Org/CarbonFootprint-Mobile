import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Platform,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import * as firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { updateUserFirebase } from '../actions/AuthAction';
import { getUser } from '../actions/firebase/User';
import Icon from 'react-native-vector-icons/EvilIcons';
var ImagePicker = require('react-native-image-picker');
import images from '../config/images';
import { color } from '../config/helper';

const { height, width } = Dimensions.get('window');

/**
 * Screen showing the edit options for the profile and personal information.
 * default profile pic if not available
 * @extends Component
 */
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateClicked: false,
            name: this.props.user.name,
            email: this.props.user.email,
            phone_no: this.props.user.phone_no ? this.props.user.phone_no : null,
            picture: this.props.user.picture ? this.props.user.picture : images.logo
        };
    }

    /**
     * verify updatation of user details in the database
     * @param  uid  user id or unique id of logged in user
     * @return if current state user profile matches with the entry in the database
     */
    verifyProfileUpdate(uid) {
        getUser(uid).then(user => {
            if (
                user.name === this.state.name &&
                user.phone_no == this.state.phone_no &&
                user.picture === this.state.picture
            ) {
                Toast.show('Profile Updated');
                this.setState({ updateClicked: false });
            } else verifyProfileUpdate(uid);
        });
    }

    /**
     * handle update function that is fired up on pressing update button
     * @return updated user firebase
     */
    handleUpdate() {
        if (this.state.name === '') {
            Toast.show('You cannot leave name blank');
        } else if (this.state.phone_no && this.state.phone_no.length !== 10) {
            Toast.show('Please enter valid 10 digit number');
        } else {
            this.setState({ updateClicked: true });
            this.props.updateUserFirebase(this.state).then(() => {
                const uid = firebase.auth().currentUser.uid;
                this.verifyProfileUpdate(uid);
            });
        }
    }

    /**
     *  This function provides options for adding incident image, and updates the image object.
     * @return updates the incident image.
     */
    _cameraImage = () => {
        var options = {
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

    render() {
        let CustomButton = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

        return (
            <View style={styles.container}>
                <Header iconName="arrow-back" icon={true} text="Profile" />
                <View>
                    <View style={styles.avatarContainer}>
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
                        <TouchableOpacity activeOpacity={0.4} onPress={() => this._cameraImage()}>
                            <Text style={styles.userName}>Change Profile Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.valueItem}>
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueText}>Name</Text>
                        </View>
                        <TextInput
                            autoCorrect={false}
                            ref={input => (this.nameInput = input)}
                            onChangeText={name =>
                                this.setState({
                                    name
                                })
                            }
                            onSubmitEditing={() => this.emailInput.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder="Name"
                            value={this.state.name}
                        />
                    </View>

                    <View style={styles.valueItem}>
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueText}>Email</Text>
                        </View>
                        <Text style={styles.textInput}>{this.state.email}</Text>
                    </View>
                    <View style={styles.valueItem}>
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueText}>Contact Number</Text>
                        </View>
                        <TextInput
                            autoCorrect={false}
                            ref={input => (this.phoneNoInput = input)}
                            onChangeText={phone_no =>
                                this.setState({
                                    phone_no
                                })
                            }
                            onSubmitEditing={() => this.emergencyContactNameInput.focus()}
                            keyboardType="phone-pad"
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder="Phone No."
                            value={this.state.phone_no}
                        />
                    </View>
                    {this.state.updateClicked ? (
                        <ActivityIndicator size="small" color={color.primary} />
                    ) : null}
                    <CustomButton onPress={() => this.handleUpdate()}>
                        <View style={styles.updateButton}>
                            <Text style={styles.whiteText}>Update</Text>
                        </View>
                    </CustomButton>
                </View>
            </View>
        );
    }
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
UserProfile.propTypes = {
    updateUserFirebase: PropTypes.func.isRequired,
    user: PropTypes.object
};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */

//Styling for the profile editing screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    textInput: {
        flex: 2,
        textAlign: 'right',
        color: '#4ebaaa'
    },
    avatarContainer: {
        backgroundColor: color.primary,
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 62 : 48,
        paddingTop: height / 20,
        paddingBottom: height / 30,
        marginBottom: height / 30
    },
    avatar: {
        justifyContent: 'center',
        height: width / 2.7,
        width: width / 2.7,
        borderRadius: 100
    },
    userName: {
        paddingTop: height / 30,
        fontSize: 17,
        color: 'white'
    },
    valueItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: width / 15
    },
    valueTextContainer: {
        justifyContent: 'center'
    },
    valueText: {
        color: 'black'
    },
    updateButton: {
        height: 35,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        marginTop: 25
    },
    whiteText: {
        fontSize: 15,
        color: 'white'
    },
    updateText: {
        color: 'white'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateUserFirebase }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);
