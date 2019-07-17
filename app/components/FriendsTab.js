/*
 * Displays list of friends (this.props.choice = 1)
 * and friend requests (this.props.choice = 2)
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableNativeFeedback,
    Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-simple-toast';

import * as LoaderAction from '../actions/LoaderAction';
import { acceptFriendRequest, deleteFriend } from '../actions/firebase/Friends';
import { color, getIcon } from '../config/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import FriendRow from './FriendRow';
import WarningTextAndIcon from './WarningTextAndIcon';

/**
 * Component Showing List Of Friends And Friend Requests
 * @extends Component
 */
class FriendsTab extends Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        this.props.getFriendList(this.props.choice);
    }

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
        if (friendList === null || Object.keys(friendList).length <= 0) {
            return <WarningTextAndIcon iconName="sad" text="It's kind of lonely here." />;
        } else {
            // Gamification: Sorting friends list based on emitted co2
            /*
            if(this.props.choice === "1") {
                this.props.getUser(this.props.auth.user.uid).then((usr) => {
                    console.log("----------------------------------------------------------------------------------");
                    console.log(usr);
                    friendList.push(usr);
                }).catch((error) => alert(error))
                friendList.sort(function(f1, f2) {
                    if(! f1.hasOwnProperty(data) && f2.hasOwnProperty(data))
                        return -1;
                    if(f1.hasOwnProperty(data) && ! f2.hasOwnProperty(data))
                        return 1;
                    if(! f1.hasOwnProperty(data) && ! f2.hasOwnProperty(data))
                        return 0;
                    if(f1.hasOwnProperty(data) && f2.hasOwnProperty(data))
                       return f1.data.total.footprint - f2.data.total.footprint;
                });
            }
            */
            console.log(friendList);
            return (
                <ScrollView contentContainerStyle={styles.friends}>
                    {friendList.map((friend, index) => {
                        return (
                            <View key={index}>
                                <FriendRow
                                    last={index === friendList.length - 1}
                                    data={friend}
                                    iconName={
                                        this.props.choice === '2'
                                            ? ['checkmark', 'close']
                                            : ['close']
                                    }
                                    reject={this.removeFriend.bind(
                                        this,
                                        this.props.auth.user.uid,
                                        friend.uid,
                                        'Friend Request'
                                    )}
                                    link={
                                        this.props.choice === '2'
                                            ? () => {
                                                  this.props.loaderToggle();
                                                  acceptFriendRequest(
                                                      this.props.auth.user.uid,
                                                      friend.uid
                                                  ).then(user => {
                                                      this.props.loaderToggle();
                                                      this.props.getFriendList(this.props.choice);
                                                  });
                                              }
                                            : this.removeFriend.bind(
                                                  this,
                                                  this.props.auth.user.uid,
                                                  friend.uid,
                                                  'Friend'
                                              )
                                    }
                                    text={
                                        friend.data && friend.data.total
                                            ? friend.data.total.footprint
                                            : 'No Activity'
                                    }
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            );
        }
    }
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: color.greyBack,
        flex: 1
    },
    friends: {
        backgroundColor: color.greyBack,
        alignItems: 'center',
        flex: 1
    }
});

FriendsTab.propTypes = {
    acceptFriendRequest: PropTypes.func.isRequired,
    getFriendList: PropTypes.func.isRequired,
    friends: PropTypes.object,
    choice: PropTypes.string
};

/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, LoaderAction), dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsTab);
