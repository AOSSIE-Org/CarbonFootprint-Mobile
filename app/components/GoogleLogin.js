import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback, Image } from 'react-native';

class GoogleLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') { // Google Login for Android
		    return (
		      	<TouchableNativeFeedback onPress = {() => this.props.googleSignIn()}> 
		      		<Image style = {{height: 60, width: 60}} source = {require('../images/google.png')}/> 
		      	</TouchableNativeFeedback>
		    );
		} else { // Amit will add code for ios later
			alert("OS is not android");
		}
	}
}

export default GoogleLogin;