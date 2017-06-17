import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback, Image } from 'react-native';

class FbLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') { // FbLogin for Android
		    return (
		    	<TouchableNativeFeedback onPress = {() => this.props.fbLogin()}> 
		      		<Image style = {{height: 75, width: 75}} source = {require('../images/fb.png')}/> 
		      	</TouchableNativeFeedback>
		    );
		}
	}
}

export default FbLogin;