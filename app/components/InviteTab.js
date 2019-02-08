/*
 * To invite friends (send friend requests)
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableNativeFeedback,
    FlatList,
    ScrollView
} from 'react-native';
import { getIcon, color } from '../config/helper';
import {
    searchFriendsByEmail,
    searchFriendsByUserName,
    sendFriendRequest
} from '../actions/firebase/Friends';
import FriendRow from './FriendRow';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Invite Component to invite Your Friends
 * @extends Component
 */
class InviteTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            user: [],
            userFetched: false,
            firebaseProcessing: false
        };
        this.searchFriends = this.searchFriends.bind(this);
    }

    /**
     * Function to search friends by their email id or username
     * @return updating state
     */
    searchFriends() {
        this.setState({ user: [], userFetched: true, firebaseProcessing: true });
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //REGEX to check if user entered email
        if (!reg.test(this.state.search)) {
            searchFriendsByUserName(this.state.search)
                .then(users => {
                    this.setState({ user: users, firebaseProcessing: false });
                })
                .catch(error => {});
        } else {
            searchFriendsByEmail(this.state.search)
                .then(user => {
                    this.setState({ user: user, firebaseProcessing: false });
                })
                .catch(error => {});
        }
    }

    render() {
        return (
            <View>
                <Loader loading = {this.state.firebaseProcessing} />
                <TextInput
                    onChangeText={text => this.setState({ search: text })}
                    placeholder="Search friends by Email or Username"
                />
                <TouchableNativeFeedback onPress={this.searchFriends}>
                    <View style={styles.searchBtn}>
                        <Text style={styles.whiteText}>Search</Text>
                    </View>
                </TouchableNativeFeedback>

                <ScrollView style={styles.container}>
                    {this.state.user ? (
                        <View style={styles.view}>
                            <FlatList
                                data={this.state.user}
                                renderItem={({ item }) => (
                                    <FriendRow
                                        iconName={['person-add']}
                                        link={() => {
                                            this.setState({ firebaseProcessing: true });
                                            console.log("invite", this.state.firebaseProcessing);
                                            sendFriendRequest(
                                                this.props.auth.user.uid,
                                                item.uid )
                                                .then(() => {
                                                    this.setState({ firebaseProcessing: false });
                                                })
                                                .catch(() => {
                                                    this.setState({ firebaseProcessing: false });
                                                });
                                        }
                                        }
                                        data={item}
                                        text={item.email}
                                        firebaseProcessing={this.state.firebaseProcessing}
                                    />
                                )}
                            />
                        </View>
                    ) : this.state.userFetched ? (
                        <Text style={styles.warningText}>
                            No user found ...
                        </Text>
                    ) : null}
                </ScrollView>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        backgroundColor: color.greyBack
    },
    view: {
        flex: 1,
        paddingBottom: 140
    },
    searchBtn: {
        height: 35,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        marginBottom: 10
    },
    whiteText: {
        fontSize: 15,
        color: 'white'
    },
    warningText: {
        fontSize: 15,
        color: color.darkPrimary,
        marginTop: 5,
        marginLeft: 10
    }
});

export default InviteTab;
