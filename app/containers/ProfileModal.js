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
import Modal from 'react-native-modal';
import * as firebase from 'firebase';
import { getUser } from '../actions/firebase/User';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as AuthAction from '../actions/AuthAction';
import { newColors } from '../config/helper';
import images from '../config/images';
import Toast from 'react-native-simple-toast';
import ModTextInput from '../components/ModTextInput';

class ProfileModal extends Component {
    state = {
        name: this.props.user.name,
        email: this.props.user.email,
        phone_no: this.props.user.phone_no ? this.props.user.phone_no : null,
        picture: this.props.user.picture ? this.props.user.picture : images.logo
    };

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    /**
     * verify updatation of user details in the database
     * @param  uid  user id or unique id of logged in user
     * @return if current state user profile matches with the entry in the database
     */
    verifyProfileUpdate = email => {
        getUser(email).then(user => {
            if (
                user.name === this.state.name &&
                user.phone_no == this.state.phone_no &&
                user.picture === this.state.picture
            ) {
                Toast.show('Profile Updated');
                // this.setState({ updateClicked: false });
            } else verifyProfileUpdate(email);
        });
    };

    /**
     * handle update function that is fired up on pressing update button
     * @return updated user firebase
     */
    handleUpdate = () => {
        if (this.state.name.trim() === '') {
            Toast.show('You cannot leave name blank');
        } else if (this.state.phone_no && this.state.phone_no.length !== 10) {
            Toast.show('Please enter valid 10 digit number');
        } else {
            // this.props.modalToggle();
            const userProfile = Object.assign({}, this.state);
            this.props
                .updateUserFirebase(userProfile)
                .then(() => {
                    const email = firebase.auth().currentUser.email;
                    this.verifyProfileUpdate(uid);
                })
                .catch(err => {
                    console.warn(err);
                });
             this.props.modalToggle('modalVisible');   
        }
    };

    render() {
        let inputs = [
            {
                key: 'name',
                placeholder: 'John Doe',
                returnKeyType: 'next'
            },
            {
                key: 'phone_no',
                text: 'phone number',
                placeholder: 'Enter phone number',
                style: {
                    borderBottomWidth: 0
                },
                keyboardType: 'phone-pad',
                returnKeyType: 'next'
            },
            {
                key: 'email',
                placeholder: 'johndoe@gmail.com',
                editable: 'false'
            }
        ];
        return (
            <Modal
                isVisible={this.props.visible}
                style={styles.modal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => console.warn('Closing')}
            >
                <View style={styles.wrapper}>
                    <Text style={styles.header}>Profile Info</Text>
                    <Icon
                        name="close"
                        size={24}
                        color="white"
                        onPress={() => this.props.modalToggle('modalVisible')}
                        style={styles.close}
                    />
                    <View style={styles.inputForm}>
                        {inputs.map((obj, i) => {
                            return (
                                <ModTextInput
                                    value={this.state[obj.key]}
                                    handleInput={this.handleInput}
                                    stateKey={obj.key}
                                    {...obj}
                                />
                            );
                        })}
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => this.handleUpdate()}
                        >
                            <Text style={styles.updateText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        borderRadius: 5
    },
    wrapper: {
        backgroundColor: newColors.secondary,
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.9,
        position: 'relative'
        // height: Dimensions.get('window').height*0.7,
    },
    close: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    header: {
        paddingLeft: 20,
        paddingVertical: 20,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: 'white'
    },
    inputForm: {
        // backgroundColor: 'white',
        borderRadius: 5
    },
    updateButton: {
        backgroundColor: newColors.secondary,
        borderRadius: 5,
        paddingVertical: 20
    },
    updateText: {
        color: newColors.black,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: 'white'
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
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileModal);
