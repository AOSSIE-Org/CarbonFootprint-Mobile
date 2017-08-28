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

import { color, getIcon } from '../config/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import FriendRow from './FriendRow';

class FriendsTab extends Component {
    componentWillMount() {
        this.props.getFriendList(this.props.choice);
    }

    render() {
        var friends = this.props.friends;
        var friendList = friends.list;
        if(friends.isFetching) {
            return (
                <View style={styles.centerScreen}>
                    <ActivityIndicator color={color.primary} size="large" />
                </View>
            )
        } else if (friendList === null ||
            Object.keys(friendList).length <= 0) {
            return (
                <View style={styles.centerScreen}>
                    <Icon name={getIcon("sad")} size={56} color={color.lightPrimary} />
                    <Text style={styles.warningText}>Its kind of lonely here.</Text>
                </View>
            )
        } else {
            // Gamification: Sorting friends list based on emitted co2
            if(this.props.choice === "1") {
                props.getUser(this.props.auth.user.uid).then((usr) => {
                    user = {...usr, uid: user.key};
                    friendList.push(user);
                }).catch((error) => alert(error))
                friendList.sort(function(f1, f2) {
                   return f1.data.total.footprint - f2.data.total.footprint;
                });
            }
            return (
                <ScrollView contentContainerStyle={styles.friends}>
                    {
                        friendList.map((friend, index) => {
                            return (
                                <View key={index}>
                                    <FriendRow last={index === (props.friends.list.length - 1)}
                                        data={friend}
                                        iconName={this.props.choice === "2"? "checkmark": null}
                                        link={this.props.choice === "2"? () => props.acceptFriendRequest(this.props.auth.user.uid, friend.uid): null}
                                        text={
                                            friend.data ?
                                            friend.data.total:
                                            "No Activity"
                                        } />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.greyBack,
        flex: 1,
    },
    warningText: {
        fontSize: 18,
        color: color.darkPrimary,
        marginTop: 10,
    },
    centerScreen: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    friends: {
        backgroundColor: color.greyBack,
        alignItems: 'center',
        flex: 1,
    }
})

export default FriendsTab;
