import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { newColors } from '../config/helper';
import StatusBarBackground from '../components/StatusBarBackground';

import FriendsTab from '../components/FriendsTab';
import InviteTab from './InviteTab';

/**
 * Friends Section Container
 */

const Friends = props => {
    const friends = useSelector(state => state.friends);
    const style = {
        backgroundColor: newColors.secondary
    };
    let friendsList = friends.list ? friends.list.length : 0;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={newColors.secondary} barStyle="light-content" />
            <StatusBarBackground style={style} />
            <ScrollableTabView
                tabBarActiveTextColor={newColors.secondary}
                tabBarUnderlineStyle={styles.underlineStyle}
                style={styles.scrollableWrapper}
            >
                <FriendsTab tabLabel="Friends" {...props} choice="1" />
                <InviteTab tabLabel="Invite" {...props} />
            </ScrollableTabView>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 13
    },
    scrollableWrapper: {
        flex: 1
    },
    underlineStyle: {
        height: 3,
        backgroundColor: newColors.secondary,
        borderRadius: 3,
        width: '50%',
        alignItems: 'center'
    }
});

export default Friends;
