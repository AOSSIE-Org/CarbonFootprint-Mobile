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
    TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import { acceptFriendRequest } from '../actions/firebase/Friends';
import { color, getIcon } from '../config/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import FriendRow from './FriendRow';
import Loader from './Loader';

/**
 * Component Showing List Of Friends And Friend Requests
 * @extends Component
 */
class FriendsTab extends Component {
    constructor(props) {
        super();
        this.state = {
            firebaseProcessing: false
        };
    }
    componentWillMount() {
        this.props.getFriendList(this.props.choice);
    }

    render() {
        var friends = this.props.friends;
        var friendList = friends.list;
        if (friendList === null || Object.keys(friendList).length <= 0) {
            return (
                <View style={styles.centerScreen}>
                    <Loader loading = {this.state.firebaseProcessing || friends.isFetching} />
                    <Icon
                        name={getIcon('sad')}
                        size={56}
                        color={color.lightPrimary}
                    />
                    <Text style={styles.warningText}>
                        Its kind of lonely here.
                    </Text>
                </View>
            );
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
            return (
                <ScrollView contentContainerStyle={styles.friends}>
                    <Loader loading = {this.state.firebaseProcessing} />
                    {friendList.map((friend, index) => {
                        return (
                            <View key={index}>
                                <FriendRow
                                    last={index === friendList.length - 1}
                                    data={friend}
                                    iconName={
                                        this.props.choice === '2'
                                            ? 'checkmark'
                                            : null
                                    }
                                    link={
                                        this.props.choice === '2'
                                            ? () =>
                                                  {
                                                      this.setState({ firebaseProcessing: true });
                                                      acceptFriendRequest(
                                                      this.props.auth.user.uid,
                                                      friend.uid
                                                  )
                                                  .then((user) => {
                                                      this.setState({ firebaseProcessing: false });
                                                      this.props.getFriendList(this.props.choice);
                                                  });
                                                }
                                            : null
                                    }
                                    text={
                                        friend.data
                                            ? friend.data.total
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
    warningText: {
        fontSize: 18,
        color: color.darkPrimary,
        marginTop: 10
    },
    centerScreen: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
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
}

//Making FriendsTab available to other parts of app
export default FriendsTab;
