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
import { STRING_EMPTY } from '../config/constants'

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
        let timeout;

        return function() {
            let context = this,
                args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            //Don't wait. Just call now.
            if (callNow) func.apply(context, args);
        };
    };

    filterUsers = searchText => {
        return new Promise((res, rej) => {
            if(this.state.search != STRING_EMPTY)
            {
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
                            (data.name.toLowerCase().includes(searchText) ||
                                data.email.toLowerCase().includes(searchText) ) ||
                                (data.email != this.props.auth.user.email)
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
            }
            else {
                this.setState({ userFetched: false })
            }
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

    handleClear = () => {
        this.setState({
            userFetched: false,
            search: ''
        })
    }

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
                                onPress={this.handleClear}
                            />
                        </View>
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
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        height: 70
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        // width: '98%',
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: newColors.secondary
    },
    inputBox: {
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'center'
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
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.12)',
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 10
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
