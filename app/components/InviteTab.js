/*
 * To invite friends (send friend requests)
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import { getIcon, color } from '../config/helper';
import { searchFriends, sendFriendRequest } from '../actions/firebase/Friends';
import FriendRow from './FriendRow';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Invite Component to invite Your Friends
 * @extends Component
 */
class InviteTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: {},
            userFetched: false
        };
        this.searchFriendsByEmail = this.searchFriendsByEmail.bind(this);
    }

    /**
     * function to search friends by their Email id
     * @return updating state
     */
    searchFriendsByEmail() {
        this.setState({ user: {}, userFetched: true });
        searchFriends(this.state.email)
            .then(snapshot => {
                var user = {
                    uid: snapshot.key,
                    name: snapshot.val().name,
                    picture: snapshot.val().picture
                };
                this.setState({ user: user });
            })
            .catch(error => {
                //console.log("InviteTab (searchFriendsByEmail)" + error)
            });
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Search friends by Email"
                />
                <TouchableNativeFeedback onPress={this.searchFriendsByEmail}>
                    <View style={styles.searchBtn}>
                        <Text style={styles.whiteText}>Search</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.container}>
                    {this.state.user.name ? (
                        <View>
                            <View>
                                <FriendRow
                                    iconName="person-add"
                                    link={() =>
                                        sendFriendRequest(
                                            this.props.auth.user.uid,
                                            this.state.user.uid
                                        )
                                    }
                                    data={this.state.user}
                                    text={this.state.user.name}
                                />
                            </View>
                        </View>
                    ) : this.state.userFetched ? (
                        <Text style={styles.warningText}>
                            No user found ...
                        </Text>
                    ) : null}
                </View>
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
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
