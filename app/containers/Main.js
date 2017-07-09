/*
    This is container for components - TodayTab, ActivityTab, TimelineTab etc.
    It includes bottom scrollable tab bar. Each tab bar item contains a component.
    Used External package - 'react-native-scrollable-tab-view'
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActivityDetectionAction from '../actions/ActivityDetectionAction';
import ActivityTab from '../components/ActivityTab';
import TodayTab from '../components/TodayTab';
import TimelineTab from '../components/TimelineTab';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  // Main function to set whole view of container, Contains various components as children
  // It sends 'Actions.activity()' to TimelineTab as link (prop) so that TimelineTab can navigate to Activity container (When needed) 
  render() {
    return (

      // 'ScrollableTabView' is predefined in external package 'react-native-scrollable-tab-view'
      <ScrollableTabView tabBarPosition="bottom" tabBarUnderlineStyle={styles.underline} tabBarBackgroundColor="#009688" tabBarActiveTextColor="white" tabBarInactiveTextColor="#eeeeee">
        <TodayTab tabLabel="Today"/>
        <ActivityTab tabLabel="Activity" {...this.props}/>
        <Text tabLabel="Paths"></Text>
        <TimelineTab tabLabel="Timeline" link={() => Actions.activityHistory()}/>
        <Text tabLabel="Friends"></Text>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    height: 2,
    backgroundColor: "white"
  }
});

// Mapping state to props so that state variables can be used through props in children components
function mapStateToProps(state) {
  return {
    activityType: state.activity.activityType
  }
}

// Mapping dispatchable action (ActivityDetectionAction) to props so that actions can be used through props in children components
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, ActivityDetectionAction), dispatch) ;
}

//This is needed to allow children components to have access to Actions and store variables
export default connect(mapStateToProps, mapDispatchToProps)(Main);