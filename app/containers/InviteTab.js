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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { color } from '../config/helper';
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
                <TextInput
                    onChangeText={text => this.setState({ search: text })}
                    placeholder="Search friends by Email or Username"
                />
                <TouchableNativeFeedback onPress={this.searchFriends}>
                    <View style={styles.searchBtn}>
                        <Text style={styles.whiteText}>Search</Text>
                    </View>
                </TouchableNativeFeedback>

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
        backgroundColor: color.greyBack
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
