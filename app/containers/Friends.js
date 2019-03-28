import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';

import { color } from '../config/helper';

import FriendsTab from '../components/FriendsTab';
import InviteTab from './InviteTab';
import Loader from '../components/Loader';

import * as FirebaseAction from '../actions/firebase/Friends';
import * as FriendsAction from '../actions/FriendsAction';
import * as LoaderAction from '../actions/LoaderAction';
import * as User from '../actions/firebase/User';

/**
 * Friends Section Container
 */

const Friends = props => (
    <View style={styles.container}>
        <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
        <View style={styles.pad} />
        <ScrollableTabView
            tabBarBackgroundColor={color.primary}
            tabBarActiveTextColor={color.greyBack}
            tabBarInactiveTextColor={color.grey}
            tabBarTextStyle={styles.tabText}
            tabBarUnderlineStyle={styles.tabLine}
            style={styles.tabStyle}
            onChangeTab={obj => {
                switch (obj.i) {
                    // List of friend requests
                    case 1:
                        props.getFriendList('2');
                        break;
                    case 2:
                        break;
                    // List of friends
                    default:
                        props.getFriendList('1');
                        break;
                }
            }}
        >
            <FriendsTab tabLabel="Friends" {...props} choice="1" />
            <FriendsTab tabLabel="Requests" {...props} choice="2" />
            <InviteTab tabLabel="Invite" {...props} />
        </ScrollableTabView>
    </View>
);
/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    underline: {
        height: 2,
        backgroundColor: color.greyBack
    },
    tabText: {
        fontSize: 13
    },
    tabLine: {
        backgroundColor: color.white,
        height: 2
    },
    /* Need a good fix for this */
    pad: {
        backgroundColor: color.primary,
        height: 15
    }
});
/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        friends: state.friends,
        auth: state.auth,
        loader: state.loader
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({}, FriendsAction, FirebaseAction, User, LoaderAction),
        dispatch
    );
}

Friends.propTypes = {
    getFriendList: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
