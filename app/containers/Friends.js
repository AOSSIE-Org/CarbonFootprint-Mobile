import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Header from '../components/Header';
import { getIcon, color } from '../config/helper';

import FriendsTab from '../components/FriendsTab';
import InviteTab from '../components/InviteTab';

import * as FirebaseAction from '../actions/firebase/Friends';
import * as FriendsAction from '../actions/FriendsAction';

class Friends extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
                <View style={styles.pad}></View>
                <ScrollableTabView tabBarBackgroundColor={color.primary}
                    tabBarActiveTextColor={color.greyBack}
                    tabBarInactiveTextColor={color.grey}
                    tabBarTextStyle={styles.tabText}
                    tabBarUnderlineStyle={styles.tabLine}
                    style={styles.tabStyle}
                    onChangeTab={(obj) => {
                        switch(obj.i) {
                            case 1:
                                this.props.getFriendList("2");
                                break;
                            case 2:
                                break;
                            default:
                                this.props.getFriendList("1");
                                break;
                        }
                    }} >
                    <FriendsTab tabLabel="Friends" {...this.props} choice="1" />
                    <FriendsTab tabLabel="Requests" {...this.props} choice="2" />
                    <InviteTab tabLabel="Invite" {...this.props} />
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underline: {
        height: 2,
        backgroundColor: color.greyBack,
    },
    tabText: {
        fontSize: 13,
    },
    tabLine: {
        backgroundColor: color.white,
        height: 2,
    },
    /* Need a good fix for this */
    pad: {
        backgroundColor: color.primary,
        height: 15,
    },
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, FriendsAction, FirebaseAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
