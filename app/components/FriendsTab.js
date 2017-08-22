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
import { acceptFriendRequest } from '../actions/firebase/Friends';
import FriendRow from './FriendRow';

class FriendsTab extends Component {
    componentWillMount() {
        this.props.getFriendList(this.props.choice);
    }

    acceptRequestBtnClick(uid) {
        //alert("UID: " + uid);
        if(this.props.choice === "2")
            acceptFriendRequest(this.props.auth.user.uid, uid);
        else 
            alert("Already friends");
    }

    render() {
        const props = this.props;
        if (props.friends.isFetching) {
            return (
                <View style={styles.centerScreen}>
                    <ActivityIndicator color={color.primary} size="large" />
                </View>
            )
        } else if (props.friends.list === null ||
            Object.keys(props.friends.list).length <= 0) {
            return (
                <View style={styles.centerScreen}>
                    <Icon name={getIcon("sad")} size={56} color={color.lightPrimary} />
                    <Text style={styles.warningText}>Its kind of lonely here.</Text>
                </View>
            )
        } else {
            return (
                <ScrollView contentContainerStyle={styles.friends}>
                    {
                        props.friends.list.map((friend, index) => {
                            return (
                                <View key={index}>
                                    <FriendRow last={index === (props.friends.list.length - 1)}
                                        data={friend}
                                        text={
                                            friend.data ?
                                            friend.data.total:
                                            "No Activity"
                                        } />
                                    <TouchableNativeFeedback onPress={() => this.acceptRequestBtnClick(friend.uid)}>    
                                            <Text>Accept</Text>
                                    </TouchableNativeFeedback>
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
