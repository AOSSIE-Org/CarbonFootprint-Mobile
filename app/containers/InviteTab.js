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
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
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
            user: null,
            userFetched: false
        };
        this.searchFriends = this.searchFriends.bind(this);
    }

    /**
     * Function to search friends by their email id or username
     * @return updating state
     */
    searchFriends() {
        this.props.loaderToggle();
        this.setState({ user: null, userFetched: true });
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //REGEX to check if user entered email
        if (!reg.test(this.state.search)) {
            searchFriendsByUserName(this.state.search)
                .then(users => {
                    this.setState({ user: users });
                    this.props.loaderToggle();
                })
                .catch(error => {
                    this.props.loaderToggle();
                });
        } else {
            searchFriendsByEmail(this.state.search)
                .then(user => {
                    this.setState({ user: user });
                    this.props.loaderToggle();
                })
                .catch(error => {
                    this.props.loaderToggle();
                });
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Icon name="search" size={16} style={styles.searchIcon} />
                            <TextInput
                                value={this.state.search}
                                onChangeText={text => this.setState({ search: text })}
                                placeholder="Search friends by Email or Username"
                            />
                            <Icon
                                name="times-circle"
                                size={16}
                                style={styles.clearIcon}
                                onPress={() => this.setState({ search: '' })}
                            />
                        </View>
                        <TouchableOpacity style={styles.searchText} onPress={this.searchFriends}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.user ? (
                    <ScrollView style={styles.container}>
                        <View style={styles.view}>
                            <FlatList
                                data={this.state.user}
                                renderItem={({ item }) => (
                                    <FriendRow
                                        iconName={['person-add']}
                                        link={() => {
                                            this.props.loaderToggle();
                                            sendFriendRequest(this.props.auth.user.uid, item.uid)
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
                    <WarningTextAndIcon iconName="sad" text="No User Found." />
                ) : null}
            </View>
        );
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        // backgroundColor: color.greyBack
    },
    view: {
        flex: 1
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
        borderRadius: 30,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1
    },
    searchIcon: {
        marginLeft: 5
    },
    clearIcon: {
        marginRight: 5
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
    searchText: {
        // backgroundColor: 'green',
        paddingHorizontal: 10
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
