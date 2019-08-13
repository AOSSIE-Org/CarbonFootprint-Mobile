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
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { bindActionCreators } from 'redux';
import { color, newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    searchFriendsByEmail,
    searchFriendsByUserName,
    sendFriendRequest
} from '../actions/firebase/Friends';
import FriendRow from '../components/FriendRow';
import WarningTextAndIcon from '../components/WarningTextAndIcon';
import * as LoaderAction from '../actions/LoaderAction';

/**
 * Invite Component to invite Your Friends
 * @extends Component
 */
class InviteTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            users: [],
            userFetched: false
        };
    }

    debounce = (func, wait, immediate) => {
        var timeout;

        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            //Don't wait. Just call now.
            if (callNow) func.apply(context, args);
        };
    };

    filterUsers = searchText => {
        return new Promise((res, rej) => {
            searchText = searchText.toLowerCase();
            firebase
                .database()
                .ref('users/')
                .once('value')
                .then(snapshot => {
                    let users = [];
                    snapshot.forEach(val => {
                        // this will have all the users.
                        let data = val.val();
                        if (
                            data.name &&
                            data.email &&
                            (data.name.toLowerCase().indexOf(searchText) != -1 ||
                                data.email.toLowerCase().indexOf(searchText) != -1)
                        )
                            users.push({
                                name: data.name,
                                picture: data.picture,
                                email: data.email
                            });
                    });
                    this.setState({ users: users, userFetched: true });
                    res(users);
                })
                .catch(err => rej(err));
        });
    };

    handleInputChange = async text => {
        this.setState({ search: text }, async () => {
            try {
                await this.filterUsersDebounced(text);
            } catch (err) {
                this.setState({
                    users: [],
                    userFetched: true
                });
            }
        });
    };

    filterUsersDebounced = this.debounce(this.filterUsers, 500, false);

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Icon name="search" size={16} style={styles.searchIcon} />
                            <TextInput
                                value={this.state.search}
                                onChangeText={this.handleInputChange}
                                placeholder="Search friends by Email or Username"
                                style={styles.inputBox}
                                autoCapitalize="none"
                            />
                            <Icon
                                name="times-circle"
                                size={16}
                                style={styles.clearIcon}
                                onPress={() => this.setState({ search: '' })}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.searchTextContainer}
                            onPress={this.searchFriends}
                        >
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.users.length > 0 ? (
                    <ScrollView style={styles.container}>
                        <View style={styles.view}>
                            <FlatList
                                contentContainerStyle={styles.flatlist}
                                data={this.state.users}
                                renderItem={({ item }) => (
                                    <FriendRow
                                        iconName={['plus-circle']}
                                        link={() => {
                                            this.props.loaderToggle();
                                            sendFriendRequest(
                                                this.props.auth.user.email,
                                                item.email
                                            )
                                                .then(() => {
                                                    this.props.loaderToggle();
                                                })
                                                .catch(() => {
                                                    this.props.loaderToggle();
                                                });
                                        }}
                                        data={item}
                                        text={item.email}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                ) : this.state.userFetched ? (
                    <View style={styles.warningWrapper}>
                        <WarningTextAndIcon iconName="sad" text="No User Found." />
                    </View>
                ) : (
                    <View style={styles.warningWrapper}>
                        <WarningTextAndIcon
                            iconName="leaf"
                            text="Find your friends and save the environment."
                        />
                    </View>
                )}
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {},
    view: {
        flex: 1
    },
    flatlist: {
        alignItems: 'center'
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
    warningWrapper: {
        position: 'relative',
        flex: 1
    },
    whiteText: {
        fontSize: 15,
        color: 'white'
    },
    searchWrapper: {
        backgroundColor: newColors.secondary,
        alignItems: 'center',
        paddingBottom: 10,
        height: 50
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        paddingVertical: Platform.OS == 'android' ? 0 : 10,
        borderRadius: 30,
        width: '70%',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1
    },
    inputBox: {
        // backgroundColor: 'red',
        flex: 1
    },
    searchIcon: {
        marginHorizontal: 5
    },
    clearIcon: {
        marginHorizontal: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        // alignSelf: 'flex-start',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.12)',
        width: Dimensions.get('window').width * 0.9
        // justifyContent: 'center'
    },
    searchTextContainer: {
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'center'
    }
});

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
)(InviteTab);
