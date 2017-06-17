import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback, Image } from 'react-native';

class GoogleLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') { // GoogleLogin for Android
		    return (
		      	<TouchableNativeFeedback onPress = {() => this.props.googleSignIn()}> 
		      		<Image style = {{height: 75, width: 75}} source = {require('../images/google.png')}/> 
		      	</TouchableNativeFeedback>
		    );
		}
	}
}

export default GoogleLogin;