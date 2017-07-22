/*
	This is a container for component which displays detailed activity stats for user's activity history
*/

import React, { Component } from 'react';
import {
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform } from 'react-native';

class ActivityHistory extends Component {
	constructor(props) {
		super(props);
	}

	// It renders component which displays detailed activity stats for user's activity history.
	// For now, I have used same ActivityTab component which is mainly for displaying current user's activity. I will change it later.
	render() {
		return(
			<Text>Detailed description of activity</Text>
		);
	}
}

// Mapping state to props so that state variables can be used through props in children components
function mapStateToProps(state) {
    return state;
}

// Mapping dispatchable action (ActivityDetectionAction) to props so that actions can be used through props in children components
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}), dispatch);
}

//This is needed to allow children components to have access to Actions and store variables
export default connect(mapStateToProps, mapDispatchToProps)(ActivityHistory);
