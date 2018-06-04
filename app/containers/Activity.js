/*
    This is container for components - TodayTab, ActivityTab, TimelineTab etc.
    It includes bottom scrollable tab bar. Each tab bar item contains a component.
    Used External package - 'react-native-scrollable-tab-view'
*/

import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActivityDetectionAction from '../actions/ActivityDetectionAction';
import * as ActivityDetailsAction from '../actions/ActivityDetailsAction';
import ActivityTab from '../components/ActivityTab';
import TodayTab from '../components/TodayTab';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { color } from '../config/helper';
import Footer from '../components/Footer';

const Activity = props => {

  // Main function to set whole view of container, Contains various components as children
  // It sends 'Actions.activity()' to TimelineTab as link (prop) so that TimelineTab can navigate to Activity container (When needed)
    return (
      <View style={styles.container}> 
        <StatusBar backgroundColor={color.darkPrimary} barStyle="light-content" />
        <View style={styles.pad}></View>
        <ScrollableTabView
          tabBarBackgroundColor={color.primary}
          tabBarActiveTextColor={color.greyBack}
          tabBarInactiveTextColor={color.grey}
          tabBarTextStyle={styles.tabText}
          tabBarUnderlineStyle={styles.tabLine}>
          <TodayTab tabLabel="Today" {...props}/>
          <ActivityTab tabLabel="Activity" {...props}/>
        </ScrollableTabView>
      </View>
    );
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 13
    },
    tabLine: {
        backgroundColor: color.white,
        height: 2
    },
    pad: {
        backgroundColor: color.darkPrimary,
        height: 7
    }
});

/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param  state type of data control a component which changes on change component renders again
 * @return {state} getting as props
 */
function mapStateToProps(state) {
    return state;
}

/**
 * Mapping dispatchable action (ActivityDetectionAction) to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({}, ActivityDetectionAction, ActivityDetailsAction),
        dispatch
    );
}

//This is needed to allow children components to have access to Actions and store variables
export default connect(mapStateToProps, mapDispatchToProps)(Activity);
