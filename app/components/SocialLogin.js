import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback, Image } from 'react-native';

class SocialLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') {
			let path;
			let id = this.props.id;
			switch(id) {
				case '1': {
					path = require('../images/twitter.png');
					break;
				}
				case '2': {
					path = require('../images/tumblr.png');
					break;
				}
				default: {
					path = null;
				}
			}
		    return (
		    	<TouchableNativeFeedback onPress = {() => this.props.socialLogin(id)}> 
		      		<Image style = {{height: 60, width: 60}} source = {path}/> 
		      	</TouchableNativeFeedback>
		    );
		} else { // Amit will add code for ios later
			alert("OS is not android");
		}
	}
}

export default SocialLogin;