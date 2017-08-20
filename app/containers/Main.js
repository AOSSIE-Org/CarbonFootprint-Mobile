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
import * as ActivityDetailsAction from '../actions/ActivityDetailsAction';
import ActivityTab from '../components/ActivityTab';
import TodayTab from '../components/TodayTab';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Footer from '../components/Footer';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  // Main function to set whole view of container, Contains various components as children
  // It sends 'Actions.activity()' to TimelineTab as link (prop) so that TimelineTab can navigate to Activity container (When needed)
  render() {
    return (
      // 'ScrollableTabView' is predefined in external package 'react-native-scrollable-tab-view' 

      <ScrollableTabView style={styles.container} tabBarPosition="bottom" tabBarUnderlineStyle={styles.underline} tabBarBackgroundColor="white" tabBarActiveTextColor="#009688" tabBarInactiveTextColor="#000000">
        <TodayTab tabLabel="Today"/>
        <ActivityTab tabLabel="Activity" {...this.props}/>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    height: 0,
    backgroundColor: "white"
  },
  container: {
    marginBottom: 45
  }
});

// Mapping state to props so that state variables can be used through props in children components
function mapStateToProps(state) {
  return {
    duration: state.activity.duration,
    distance: state.activity.distance,
    co2: state.activity.co2,
    type: state.activity.type,
    src: state.activity.src,
    dest: state.activity.dest
  }
}

// Mapping dispatchable action (ActivityDetectionAction) to props so that actions can be used through props in children components
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, ActivityDetectionAction, ActivityDetailsAction), dispatch) ;
}

//This is needed to allow children components to have access to Actions and store variables
export default connect(mapStateToProps, mapDispatchToProps)(Main);
