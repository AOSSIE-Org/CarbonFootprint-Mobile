import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import { getUser } from '../actions/firebase/User';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { newColors } from '../config/helper';
import images from '../config/images';
import Toast from 'react-native-simple-toast';
import ModTextInput from '../components/ModTextInput';
import { STRING_EMPTY } from '../config/constants';
import { updateUserFirebase } from '../config/actionDispatcher';

const ProfileModal = props => {
    const user = useSelector(state => state.auth.user);
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        phone_no: user.phone_no ? user.phone_no : null,
        picture: user.picture ? user.picture : images.logo
    });
    const dispatch = useDispatch();

    const handleInput = (key, value) => {
        if (key === 'name') {
            setData({
                ...data,
                name: value
            });
        } else {
            setData({
                ...data,
                phone_no: value
            });
        }
    };

    /**
     * verify updatation of user details in the database
     * @param  uid  user id or unique id of logged in user
     * @return if current state user profile matches with the entry in the database
     */
    const verifyProfileUpdate = email => {
        getUser(email).then(user => {
            if (
                user.name === data.name &&
                user.phone_no == data.phone_no &&
                user.picture === data.picture
            ) {
                Toast.show('Profile Updated');
            } else verifyProfileUpdate(email);
        });
    };

    /**
     * handle update function that is fired up on pressing update button
     * @return updated user firebase
     */
    const handleUpdate = () => {
        if (data.name.trim() === STRING_EMPTY) {
            Toast.show('You cannot leave name blank');
        } else if (data.phone_no && data.phone_no.length !== 10) {
            Toast.show('Please enter valid 10 digit number');
        } else {
            const userProfile = Object.assign({}, data);
            dispatch(updateUserFirebase(userProfile))
                .then(() => {
                    const email = auth().currentUser.email;
                    verifyProfileUpdate(uid);
                })
                .catch(err => {
                    console.warn(err);
                });
            props.modalToggle('modalVisible');
        }
    };

    const _modalToggle = () => props.modalToggle('modalVisible');

    const inputs = [
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
            isVisible={props.visible}
            style={styles.modal}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.wrapper}>
                <Text style={styles.header}>Profile Info</Text>
                <Icon
                    name="close"
                    size={24}
                    color="white"
                    onPress={_modalToggle}
                    style={styles.close}
                />
                <View style={styles.inputForm}>
                    {inputs.map((obj, i) => {
                        return (
                            <ModTextInput
                                value={data[obj.key]}
                                handleInput={handleInput}
                                stateKey={obj.key}
                                {...obj}
                            />
                        );
                    })}
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.updateText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

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

export default React.memo(ProfileModal);
