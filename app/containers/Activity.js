/*
    This is container for components - TodayTab, ActivityTab etc.
    It includes bottom scrollable tab bar. Each tab bar item contains a component.
    Used External package - 'react-native-scrollable-tab-view'
*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, BackHandler, ToastAndroid } from 'react-native';
import ActivityTab from '../components/ActivityTab';
import StatusBarBackground from '../components/StatusBarBackground';
import TodayTab from '../components/TodayTab';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { newColors } from '../config/helper';

const Activity = props => {
    const [backClickCount, setBackClickCount] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('handleBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('handleBackPress', handleBackPress);
    }, [backClickCount]);

    useEffect(() => {
        if (backClickCount) {
            ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackClickCount(false), 1000);
        }
    }, [backClickCount]);

    const handleBackPress = () => {
        if (backClickCount) {
            BackHandler.exitApp();
        } else {
            setBackClickCount(true);
        }
        return true;
    };

    const style = {
        backgroundColor: 'white'
    };
    // Main function to set whole view of container, Contains various components as children
    // It sends 'Actions.activity()' to TimelineTab as link (prop) so that TimelineTab can navigate to Activity container (When needed)
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={newColors.secondary} barStyle="dark-content" />
            <StatusBarBackground style={style} />
            <ScrollableTabView
                tabBarActiveTextColor={newColors.secondary}
                tabBarUnderlineStyle={styles.underlineStyle}
                tabBarBackgroundColor="white"
            >
                <TodayTab tabLabel="Today" {...props} />
                <ActivityTab tabLabel="Activity" {...props} />
            </ScrollableTabView>
        </View>
    );
};

//StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: newColors.secondary
    },
    tabText: {
        fontSize: 13
    },
    tabLine: {
        backgroundColor: newColors.secondary,
        height: 0
    },
    underlineStyle: {
        height: 3,
        backgroundColor: newColors.secondary,
        borderRadius: 3,
        width: '50%',
        alignItems: 'center'
    }
});

//This is needed to allow children components to have access to Actions and store variables
export default Activity;
