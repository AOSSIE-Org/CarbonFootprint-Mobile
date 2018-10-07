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
    ToastAndroid,
    TouchableNativeFeedback,
    Platform,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { updateUserFirebase } from '../actions/AuthAction';
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
            phone_no: this.props.user.phone_no
                ? this.props.user.phone_no
                : null,
            picture: this.props.user.picture
                ? this.props.user.picture.uri
                    ? this.props.user.picture.uri
                    : this.props.user.picture
                : images.logo
        };
    }
    /**
     * handle update function that is fired up on pressing update button
     * @return updated user firebase
     */

    handleUpdate() {
        if (this.state.name === '') {
            ToastAndroid.show(
                'You cannot leave name blank',
                ToastAndroid.SHORT
            );
        } else if (this.state.phone_no && this.state.phone_no.length !== 10) {
            ToastAndroid.show(
                'Please enter valid 10 digit number',
                ToastAndroid.SHORT
            );
        } else {
            this.setState({ updateClicked: true });
            this.props.updateUserFirebase(this.state).then(() => {
                setTimeout(() => {
                    ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);
                    this.setState({ updateClicked: false });
                }, 2000);
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
                ToastAndroid.show('Image Pick Error', ToastAndroid.SHORT);
            } else if (response.didCancel) {
            } else if (response.customButton) {
                ToastAndroid.show(
                    'User Tapped Custom Button',
                    ToastAndroid.SHORT
                );
            } else {
                this.setState({
                    picture: response.uri
                });
                ToastAndroid.show('Image Added', ToastAndroid.SHORT);
            }
        });
    };

    render() {
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
                                source={{ uri: this.state.picture }}
                            />
                        )}
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => this._cameraImage()}
                        >
                            <Text style={styles.userName}>
                                Change Profile Photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.valueItem}>
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueText}>Name</Text>
                        </View>
                        <TextInput
                            autoCorrect={false}
                            ref={input => (this.nameInput = input)}
                            onChangeText={name => this.setState({ name })}
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
                        <Text style={styles.textInput}>
                            {this.props.user.email}
                        </Text>
                    </View>
                    <View style={styles.valueItem}>
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueText}>Contact Number</Text>
                        </View>
                        <TextInput
                            autoCorrect={false}
                            ref={input => (this.phoneNoInput = input)}
                            onChangeText={phone_no =>
                                this.setState({ phone_no })
                            }
                            onSubmitEditing={() =>
                                this.emergencyContactNameInput.focus()
                            }
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
                    <TouchableNativeFeedback
                        onPress={() => this.handleUpdate()}
                    >
                        <View style={styles.updateButton}>
                            <Text style={styles.whiteText}>Update</Text>
                        </View>
                    </TouchableNativeFeedback>
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
        flex: 1
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
