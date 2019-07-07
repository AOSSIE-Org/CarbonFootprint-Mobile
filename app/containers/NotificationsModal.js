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
import * as LoaderAction from '../actions/LoaderAction';
import { updateUserFirebase } from '../actions/AuthAction';
import * as FriendsAction from '../actions/FriendsAction';
import { newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../config/images';
import FriendRow from '../components/FriendRow';

class NotificationsModal extends Component {
    componentWillMount() {
        this.props.getFriendList('2');
    }

    modalToggle = () => {
        this.props.modalToggle('notificationsModalVisible');
    };

    removeFriend = (currentUid, friendUid, title) => {
        this.props.loaderToggle();
        Alert.alert(title, `Are you sure you want remove this ${title.toLowerCase()}?`, [
            {
                text: 'Yes',
                onPress: () =>
                    deleteFriend(currentUid, friendUid).then(user => {
                        this.props.loaderToggle();
                        this.props.getFriendList(this.props.choice);
                        Toast.show(`${title} Removed`);
                    })
            },
            {
                text: 'No',
                onPress: null
            }
        ]);
    };

    render() {
        let friends = this.props.friends;
        let friendList = friends.list;

        // if(this.props.loader.isLoading){
        //     return(
        //         <View style={styles.loading}>
        //             <ActivityIndicator
        //                 color="black"
        //                 animating={true}
        //                 size="large"
        //             />
        //         </View>
        // )}

        return (
            <Modal
                isVisible={this.props.visible}
                onSwipeComplete={this.modalToggle}
                swipeDirection="down"
                style={styles.modal}
                // onBackdropPress={this.modalToggle}
                // animationType="slide"
                // transparent={true}
                onRequestClose={() => console.warn('Closing')}
            >
                <Text style={styles.title}>friend requests</Text>
                <Icon
                    name="times-circle"
                    size={24}
                    style={styles.closeIcon}
                    onPress={this.modalToggle}
                />
                {friendList &&
                    friendList.map((friend, index) => {
                        return (
                            <View key={index}>
                                <FriendRow
                                    last={index === friendList.length - 1}
                                    data={friend}
                                    iconName={['check-circle', 'minus-circle']}
                                    reject={this.removeFriend.bind(
                                        this,
                                        this.props.auth.user.uid,
                                        friend.uid,
                                        'Friend Request'
                                    )}
                                    link={() => {
                                        this.props.loaderToggle();
                                        acceptFriendRequest(
                                            this.props.auth.user.uid,
                                            friend.uid
                                        ).then(user => {
                                            this.props.loaderToggle();
                                            this.props.getFriendList(this.props.choice);
                                        });
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
    }
}

var styles = StyleSheet.create({
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

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
    auth: state.auth,
    friends: state.friends,
    loader: state.loader
    // updateLoading: state.login.loading
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, FriendsAction, updateUserFirebase, LoaderAction),
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsModal);
