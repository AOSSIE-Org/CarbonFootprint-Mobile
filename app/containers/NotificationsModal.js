import React, { useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, deleteFriend } from '../actions/firebase/Friends';
import { newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FriendRow from '../components/FriendRow';
import Toast from 'react-native-simple-toast';
import { loaderToggle, getFriendList } from '../config/actionDispatcher';

const NotificationsModal = props => {
    const auth = useSelector(state => state.auth);
    const loader = useSelector(state => state.loader);
    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendList('2'));
    }, []);

    const modalToggle = () => {
        props.modalToggle('notificationsModalVisible');
    };

    const removeFriend = (currentEmail, friendEmail, title) => {
        dispatch(loaderToggle());
        Alert.alert(title, `Are you sure you want remove this ${title.toLowerCase()}?`, [
            {
                text: 'Yes',
                onPress: () =>
                    deleteFriend(currentEmail, friendEmail).then(user => {
                        dispatch(loaderToggle());
                        dispatch(getFriendList(props.choice));
                        Toast.show(`${title} Removed`);
                    })
            },
            {
                text: 'No',
                onPress: null
            }
        ]);
    };

    let friendList = friends.list;

    return (
        <Modal
            isVisible={props.visible}
            onSwipeComplete={modalToggle}
            swipeDirection="down"
            style={styles.modal}
            // onBackdropPress={this.modalToggle}
            // animationType="slide"
            // transparent={true}
            onRequestClose={() => console.warn('Closing')}
        >
            <Text style={styles.title}>Friend Requests</Text>
            <Icon name="times-circle" size={24} style={styles.closeIcon} onPress={modalToggle} />
            {friendList &&
                friendList.map((friend, index) => {
                    return (
                        <View key={index}>
                            <FriendRow
                                last={index === friendList.length - 1}
                                data={friend}
                                iconName={['check-circle', 'minus-circle']}
                                reject={() =>
                                    removeFriend(auth.user.email, friend.email, 'Friend Request')
                                }
                                link={() => {
                                    dispatch(loaderToggle());
                                    acceptFriendRequest(auth.user.email, friend.email).then(
                                        user => {
                                            dispatch(loaderToggle());
                                            dispatch(getFriendList(props.choice));
                                        }
                                    );
                                }}
                                text={
                                    friend.data && friend.data.total
                                        ? friend.data.total.footprint
                                        : 'No Activity'
                                }
                            />
                        </View>
                    );
                })}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        marginTop: Dimensions.get('window').height * 0.5,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: 'white'
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 30
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-ExtraBold',
        color: newColors.black,
        paddingTop: 10
    }
});

export default React.memo(NotificationsModal);
