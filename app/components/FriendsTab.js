/*
 * Displays list of friends (this.props.choice = 1)
 * and friend requests (this.props.choice = 2)
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { acceptFriendRequest, deleteFriend } from '../actions/firebase/Friends';
import { formatEmail } from '../config/helper';
import FriendRow from './FriendRow';
import WarningTextAndIcon from './WarningTextAndIcon';
import { loaderToggle, getFriendList } from '../config/actionDispatcher';

const FriendsTab = props => {
    const loader = useSelector(state => state.loader);
    const friends = useSelector(state => state.friends);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendList(props.choice));
    }, []);

    const removeFriend = (currentEmail, friendEmail, title) => {
        dispatch(loaderToggle());
        Alert.alert(title, `Are you sure you want remove this ${title.toLowerCase()}?`, [
            {
                text: 'Yes',
                onPress: () =>
                    deleteFriend(formatEmail(currentEmail), formatEmail(friendEmail)).then(user => {
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

    if (loader.isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="black" animating={true} size="large" />
            </View>
        );
    }

    if (friendList === null || Object.keys(friendList).length <= 0) {
        return <WarningTextAndIcon iconName="sad" text="It's kind of lonely here." />;
    }
    // } else {
    // Gamification: Sorting friends list based on emitted co2
    /*
            if(this.props.choice === "1") {
                this.props.getUser(this.props.auth.user.email).then((usr) => {
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
            {friendList.map((friend, index) => {
                return (
                    <View key={index}>
                        <FriendRow
                            last={index === friendList.length - 1}
                            data={friend}
                            iconName={
                                props.choice === '2'
                                    ? ['check-circle', 'minus-circle']
                                    : ['minus-circle']
                            }
                            reject={() => removeFriend(auth.user.uid, friend.uid, 'Friend Request')}
                            link={
                                props.choice === '2'
                                    ? () => {
                                          dispatch(loaderToggle());
                                          acceptFriendRequest(auth.user.uid, friend.uid).then(
                                              user => {
                                                  dispatch(loaderToggle());
                                                  dispatch(getFriendList(props.choice));
                                              }
                                          );
                                      }
                                    : () => removeFriend(auth.user.uid, friend.uid, 'Friend')
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
};

//StyleSheet
const styles = StyleSheet.create({
    container: {
        // backgroundColor: color.greyBack,
        alignItems: 'center',
        flex: 1
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
    friendsrowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    friends: {
        // backgroundColor: color.greyBack,
        alignItems: 'center',
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWrapper: {
        marginLeft: 15
    },
    nameText: {
        fontFamily: 'Poppins',
        fontSize: 16
    },
    emailText: {
        color: '#646464',
        fontSize: 12
    },
    friendsRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        // backgroundColor: 'red',
        width: Dimensions.get('window').width * 0.9
    }
});

export default React.memo(FriendsTab);
