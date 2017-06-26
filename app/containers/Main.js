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

import ScrollableTabView from 'react-native-scrollable-tab-view';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView tabBarPosition="bottom" tabBarUnderlineStyle={styles.underline} tabBarBackgroundColor="#009688" tabBarActiveTextColor="white" tabBarInactiveTextColor="#eeeeee">
        <TodayTab tabLabel="Today"/>
        <ActivityTab tabLabel="Activity" {...this.props}/>
        <Text tabLabel="Paths"></Text>
        <Text tabLabel="Timeline"></Text>
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

function mapStateToProps(state) {
    /*
     * Returning whole State for now.
     * Should be segragated later as the need arises.
     */
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, ActivityDetectionAction), dispatch) ;
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main);
