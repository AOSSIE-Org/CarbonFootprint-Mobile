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
    getAllFriends,
    searchFriendsByEmail,
    searchFriendsByUserName,
    sendFriendRequest
} from '../actions/firebase/Friends';
import FriendRow from './FriendRow';
import Icon from 'react-native-vector-icons/Ionicons';
import Autocomplete from 'react-native-autocomplete-input';

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
            friends: []
        };
        this.searchFriends = this.searchFriends.bind(this);
    }
    
    componentDidMount() {
        getAllFriends()
        .then( friends => {
            this.setState({ friends });
        })
        .catch( err => {});
    }
    /**
     * Function to search for friends based on input in autocomplete
     * @param query - query to search through friends
     * @return list of friends names
     */
    autocompleteFriends(query){
        if(query == '') {
            return [];
        }

        const { friends } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return friends.filter(friend => friend.email.search(regex) >=0 || friend.name.search(regex) >= 0);
    }

    /**
     * Function to search friends by their email id or username
     * @return updating state
     */

    searchFriends() {
        this.setState({ user: [], userFetched: true });
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //REGEX to check if user entered email
        if (!reg.test(this.state.search)) {
            searchFriendsByUserName(this.state.search)
                .then(users => {
                    this.setState({ user: users });
                })
                .catch(error => {});
        } else {
            searchFriendsByEmail(this.state.search)
                .then(user => {
                    this.setState({ user: user });
                })
                .catch(error => {});
        }
    }

    render() {
        const {search} = this.state;
        const friends = this.autocompleteFriends(search)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={friends.length === 1 && comp(search, friends[0].name) ? [] : friends}                    
                    onChangeText={text => this.setState({ search: text })}
                    placeholder="Search friends by username or email"
                    defaultValue={search}
                    renderItem={({name, email}) => (
                        <TouchableNativeFeedback onPress={() => this.setState({ search: email })}>
                          <Text style={styles.itemText}>
                            {name} {email}
                          </Text>
                        </TouchableNativeFeedback>
                    )}
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
                                        iconName="person-add"
                                        link={() =>
                                            sendFriendRequest(
                                                this.props.auth.user.uid,
                                                item.uid
                                            )
                                        }
                                        data={item}
                                        text={item.email}
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
        backgroundColor: 'white'
    },
    view: {
        flex: 1,
        paddingBottom: 140
    },
    searchBtn: {
        height: 29,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        margin: 5,
        zIndex: 5,
        right: 0,
        position: 'absolute'
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
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        margin: 2
    }
});

export default InviteTab;
