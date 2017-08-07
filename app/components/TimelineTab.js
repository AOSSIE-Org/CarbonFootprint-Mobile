/*
	This is for displaying history of user's activities.
	History will be in form of timeline for whole day.
	It will contain Activity Type, Source & Destination, Traveled distance and Time, Emitted and Saved CO2 etc. 
    Used External package - 'react-native-timeline-listview'
*/

import React, { Component } from 'react';
import { 
	Text,
	View, 
	StyleSheet, 
	TouchableNativeFeedback, 
	DatePickerAndroid, 
	DatePickerIOS, 
	Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-listview';

export default class TimelineTab extends Component {
	constructor(props) {
		super(props);

		// This hardcoded data is just for testing purpose. 
		// Actual data will be fetched from database where whole history of user's activities is stored.
		this.data = 
		[
			{
				title: "Google HQ",
				subtitle: "Mountain View, California, United States",
				time: "12:00 AM",
				activityType: 0,
				distance: "10 km",
				duration: "1 hr",
				co2Emitted: "5 kg",
				co2Saved: "1 kg"
			},
			{
				title: "Google HQ",
				subtitle: "Mountain View, California, United States",
				time: "12:00 AM",
				activityType: 0,
				distance: "10 km",
				duration: "1 hr",
				co2Emitted: "5 kg",
				co2Saved: "1 kg"
			},
			{
				title: "Google HQ",
				subtitle: "Mountain View, California, United States",
				time: "12:00 AM",
				activityType: 0,
				distance: "10 km",
				duration: "1 hr",
				co2Emitted: "5 kg",
				co2Saved: "1 kg"
			},
			{
				title: "Google HQ",
				subtitle: "Mountain View, California, United States",
				time: "12:00 AM",
				activityType: 0,
				distance: "10 km",
				duration: "1 hr",
				co2Emitted: "5 kg",
				co2Saved: "1 kg"
			},
			{
				title: "Google HQ",
				subtitle: "Mountain View, California, United States",
				time: "12:00 AM",
				activityType: 0,
				distance: "10 km",
				duration: "1 hr",
				co2Emitted: "5 kg",
				co2Saved: "1 kg"
			}
		];

		// 'date' is taken as state so as to reflect change when user selects a different date from date picker.
		this.state = {
			date : new Date() // Current date
		};

		// To bind 'pickDate' and 'datePickerView' functions to this class so that these functions can change current state
		this.pickDate = this.pickDate.bind(this);
		this.datePickerView = this.datePickerView.bind(this);
	}

	// For getting icons based on platform
    getIcon(name) {
      return (Platform.OS === 'android' ? "md-": "ios-") + name;
    }

	// Function to set view of ListView item
	// This function will be sent to Timeline component as prop and will be rendered by it.
	renderDetail(rowData, sectionID, rowID) {
		return (
			<View style = {styles.container}>
				<View style = {styles.locationView}>
					<View>
						<Text style = {styles.largeText}>{rowData.title}</Text>
						<Text style = {styles.smallText}>{rowData.subtitle}</Text>
					</View>
				</View>
				<TouchableNativeFeedback onPress = {this.props.link}>
					<View style = {styles.activityView}>
						<Icon name = "md-car" size = {25} color = "black"/>
						<Text style = {styles.mediumText}>Driving</Text>
						<View style = {styles.hrView}>
							<View>
								<Text style = {styles.smallText}>{rowData.distance}</Text>
								<Text style = {styles.smallText}>{rowData.duration}</Text>
							</View>
							<View>
								<Text style = {styles.smallText}>{rowData.co2Emitted}</Text>
								<Text style = {[styles.smallText, styles.greenText]}>{rowData.co2Saved}</Text>
							</View>
						</View>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}

	// To convert numeric value of month (0-11) returned by getMonth() function to String
	// And formatting date into desirable form (e.g. - June 30, 2017) and then return it.
	getDateStr(date) {
		var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var dateStr = names[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		return dateStr;
	}

	// Function to open DatePicker view and setting date selected by user to current state
	// This is only for Android. For iOS, there is seperate 'DatePickerIOS' component given later.
	async pickDate() {
		try {
		  const {action, year, month, day} = await DatePickerAndroid.open({
		    date: new Date()
		  });
		  // If user has not dismissed/cancelled DatePicker and has selected a date 
		  if(action !== DatePickerAndroid.dismissedAction && action === DatePickerAndroid.dateSetAction) {
		    var date = new Date(year, month, day);
		    // Set date to current state
		    this.setState({date});
		  }
		} catch ({code, message}) {
		  	alert("Cannot open date picker: " + message);
		}
	}

	// For Android, this function will only add DatePicker icon button.
	// For iOS, it will include all logic of DatePicker along with icon (By using DatePickerIOS component - Already defined in React Native)
	datePickerView() {
		// For Android
		if(Platform.OS == 'android') {
			return(
				<TouchableNativeFeedback onPress = {() => this.pickDate()}>
					<Icon name = "md-calendar" size = {30} color = "white"/>
				</TouchableNativeFeedback>
			);
		} else { 
			// For iOS **** Please test it ****
			<DatePickerIOS
            	style = {styles.datePickerIOSView}
            	date = {this.state.date} 
            	// On selecting different date, current state will be modified by onDateChange callback
            	onDateChange = {(date) => this.setState({date})}
            	mode = "date"
            />
		}
	}

	// For setting view of Header of this screen which will display selected date (received from current state) and DatePicker
	formatHeader() {
		return(
			<View style = {styles.header}>
				<View style = {styles.dateView}>
					<Text style = {[styles.largeText, styles.whiteText]}>{this.getDateStr(this.state.date)}</Text>
				</View>
				<View style = {styles.datePickerView}>
					{this.datePickerView()}
				</View>
			</View>
		);
	}

	// Main function to set whole view of screen
	// Timeline component is predefined in package 'react-native-timeline-listview'.
	// This component will take renderDetail function as prop to set view of ListView item.
	render() {
		return(
			<View style = {{flex: 1}}>
				{this.formatHeader()}
				<Timeline 
		          data={this.data}
			      circleSize={20}
		          circleColor='rgb(45,156,219)'
		          lineColor='rgb(45,156,219)'
		          timeContainerStyle={{minWidth:52}}
		          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
		          descriptionStyle={{color:'gray'}}
		          renderDetail={this.renderDetail}
		          separator={false}
		          innerCircle={'dot'}
		          onEventPress={this.props.link}
		          options={{style:{padding:10}}}
		        />
	        </View>
		);
	}
}

// For styling the screen
const styles = StyleSheet.create({
	// Container for every ListView item
	container: {
		flex: 1,
		height: 100,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},

	// For location (source/destination) and its address
	locationView: {
		flex:1,
		flexDirection: 'row',
		height: 40,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginLeft: 10,
		paddingBottom: 10
	},

	// For activity details - type, distance, time, CO2
	activityView: {
		flex: 1,
		flexDirection: 'row',
		height: 40,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 10
	},

	// For horizontal layout
	hrView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: 20
	},
	largeText: {
		fontSize: 20,
		color: 'black'
	},
	mediumText: {
		fontSize: 13,
		paddingLeft: 10
	},
	smallText: {
		fontSize: 11,
		paddingRight: 10
	},
	header: { 
		flexDirection: 'row',
		alignItems: 'center',
		height: 50, 
		backgroundColor: '#009688'
	},
	whiteText: {
		color: 'white'
	},
	greenText: {
		color: 'green'
	},
	dateView: {
		alignItems: 'flex-start',
		paddingLeft: 50,
		flex: 2
	},
	datePickerView: {
		alignItems: 'flex-end',
		paddingRight: 50,
		flex: 1
	},
	datePickerIOSView: {
		height: 30
	}
});