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

import * as FriendsAction from '../actions/FriendsAction';

class Friends extends Component {
    componentWillMount() {
        this.props.getFriendList();
    }
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
                                console.log(1);
                                break;
                            case 2:
                                console.log(2);
                                break;
                            default:
                                this.props.getFriends();
                                break;
                        }
                    }}>
                    <FriendsTab tabLabel="Friends" {...this.props} />
                    <Text tabLabel="Requests"></Text>
                    <Text tabLabel="Invite"></Text>
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
    return bindActionCreators(Object.assign({}, FriendsAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
