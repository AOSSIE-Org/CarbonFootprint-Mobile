import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

class FbLogin extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		if(Platform.OS === 'android') { // FbLogin for Android
		    return (
		      <View>
		        <LoginButton
		          readPermissions = {["public_profile"]}
		          onLoginFinished = {
		            (error, result) => {
		              if (error) {
		                alert("login has error: " + error);
		              } else if (result.isCancelled) {
		                alert("login is cancelled.");
		              } else {
		                AccessToken.getCurrentAccessToken().then(
		                  (data) => {
		                    const { accessToken } = data;
		                    this.props.initUser(accessToken);
		                  }
		                )
		              }
		            }
		          }
		          onLogoutFinished={() => alert("logout")}/>
		      </View>
		    );
		}
	}
}

export default FbLogin;