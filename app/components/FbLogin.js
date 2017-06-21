import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback, Image } from 'react-native';

class FbLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') { // Fb Login for Android
		    return (
		    	<TouchableNativeFeedback onPress = {() => this.props.fbLogin()}> 
		      		<Image style = {{height: 60, width: 60}} source = {require('../images/fb.png')}/> 
		      	</TouchableNativeFeedback>
		    );
		} else { // Amit will add code for ios later
			alert("OS is not android");
		}
	}
}

export default FbLogin;