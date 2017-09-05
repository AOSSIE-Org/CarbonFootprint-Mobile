/*
 * To invite friends (send friend requests)
*/

import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableNativeFeedback
} from 'react-native';
import { getIcon, color } from '../config/helper';
import { searchFriends, sendFriendRequest } from '../actions/firebase/Friends';
import FriendRow from './FriendRow';
import Icon from 'react-native-vector-icons/Ionicons';

class InviteTab extends Component {
	constructor(props) {
      super(props);
      this.state = { 
      	email: "",
      	user: {}
      };
      this.searchFriendsByEmail = this.searchFriendsByEmail.bind(this);
    }

    searchFriendsByEmail() {
    	searchFriends(this.state.email).then((snapshot) => {
    		var user = {
    			uid: snapshot.key,
    			name: snapshot.val().name,
    			picture: snapshot.val().picture
    		}
    		this.setState({user: user});
    	}).catch(
	      error => console.log("InviteTab (searchFriendsByEmail)" + error)
	    );
    }

    render() {
  		return (
  			<View>
	  			<TextInput
		          onChangeText={(text) => this.setState({email: text})}
		          placeholder="Search friends by Email" />
		        <TouchableNativeFeedback onPress={this.searchFriendsByEmail}>
		        	<View style={styles.searchBtn}>
		        		<Text style={styles.whiteText}>Search</Text>
		        	</View>
		        </TouchableNativeFeedback>
		        <View style={styles.container}>
		        {	this.state.user.name?
			        	<View>
				        	<View> 
						        <FriendRow
						        	iconName="person-add"
						        	link={() => sendFriendRequest(this.props.auth.user.uid, this.state.user.uid)}
					                data={this.state.user}
					                text={this.state.user.name} />
				            </View>
		            	</View>:
	            	<Text>No user found</Text>
	            }
  				</View>
  			</View>
  		); 
    }
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	searchBtn: {
		height: 35,
		width: 75,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: color.primary,
		marginBottom: 10
	},
	whiteText: {
		fontSize: 15,
		color: 'white'
	}
});

export default InviteTab;