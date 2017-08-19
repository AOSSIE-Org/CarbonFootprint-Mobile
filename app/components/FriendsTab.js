import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import { color, getIcon } from '../config/helper';
import Icon from 'react-native-vector-icons/Ionicons';

import FriendRow from './FriendRow';

class FriendsTab extends Component {
    render() {
        const props = this.props;
        console.log(props);
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
                                <FriendRow last={index === (props.friends.list.length - 1)}
                                    data={friend} key={index}
                                    text={
                                        friend.data ?
                                        friend.data.total:
                                        "No Activity"
                                    } />
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
