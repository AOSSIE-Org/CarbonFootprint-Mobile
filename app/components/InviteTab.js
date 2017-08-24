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
      	text: "",
      	user: {}
      };
      this.click = this.click.bind(this);
    }

    click() {
    	// What if user doesn't exists
    	searchFriends(this.state.text).then((snapshot) => {
    		var user = {
    			uid: snapshot.key,
    			name: snapshot.val().name,
    			picture: snapshot.val().picture
    		}
    		this.setState({user: user});
    	}).catch(
	      error => alert("InviteTab (click)" + error)
	    );
    }

    render() {
  		return (
  			<View>
	  			<TextInput
		          onChangeText={(text) => this.setState({text})}
		          placeholder="Search friends by Email" />
		        <TouchableNativeFeedback onPress={this.click}>
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