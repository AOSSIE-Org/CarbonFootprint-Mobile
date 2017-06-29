import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';

export default class TodayTab extends Component {
	constructor(props) {
		super(props);
	} 

	render() {
		return(
			<ScrollView contentContainerStyle = {styles.scrollView}>
			<View style = {styles.container}>
				<View style = {styles.upperActivityView}> 
					<View style = {styles.hrView}>
						<View style = {styles.blackDot}/>
						<Text style = {styles.smallText}>Emitted CO</Text><Text style = {styles.subText}>2</Text>
						<View style = {styles.greenDot}/>
						<Text style = {styles.smallGreenText}>Saved CO</Text><Text style = {styles.subText}>2</Text>
					</View>
					<View style = {styles.largeActivity_icon}>
						<Text style = {styles.mediumText}>TODAY</Text>
						<View style = {styles.hrView}>
							<Text style = {styles.mediumText}>15</Text>
							<Text style = {styles.smallText}>km</Text> 
						</View>
						<Image source = {images.co2Icon} style = {styles.co2Icon}/>
						<View style = {styles.hrView}>
							<Text style = {styles.mediumText}>35</Text>
							<Text style = {styles.smallText}>kg</Text> 
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>15</Text>
							<Text style = {styles.smallGreenText}>kg</Text> 
						</View>
					</View>
				</View>
				<View style = {styles.lowerActivityView}>
					<View style = {styles.lowerActivityItemView}>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>km</Text>
						</View>
						<View style = {styles.activity_icon}>
							<Icon name="md-walk" size={35} color="white"/>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>kg</Text>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>7</Text>
							<Text style = {styles.smallGreenText}>kg</Text>
						</View>
					</View>
					<View style = {styles.lowerActivityItemView}>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>km</Text>
						</View>
						<View style = {styles.activity_icon}>
							<Icon name="md-bicycle" size={35} color="white"/>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>kg</Text>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>7</Text>
							<Text style = {styles.smallGreenText}>kg</Text>
						</View>
					</View>
					<View style = {styles.lowerActivityItemView}>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>km</Text>
						</View>
						<View style = {styles.activity_icon}>
							<Icon name="md-car" size={35} color="white"/>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>kg</Text>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>7</Text>
							<Text style = {styles.smallGreenText}>kg</Text>
						</View>
					</View>
					<View style = {styles.lowerActivityItemView}>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>km</Text>
						</View>
						<View style = {styles.activity_icon}>
							<Icon name="md-bus" size={35} color="white"/>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>kg</Text>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>7</Text>
							<Text style = {styles.smallGreenText}>kg</Text>
						</View>
					</View>
					<View style = {styles.lowerActivityItemView}>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>km</Text>
						</View>
						<View style = {styles.activity_icon}>
							<Icon name="md-train" size={35} color="white"/>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallText}>7</Text>
							<Text style = {styles.smallText}>kg</Text>
						</View>
						<View style = {styles.hrView}>
							<Text style = {styles.smallGreenText}>7</Text>
							<Text style = {styles.smallGreenText}>kg</Text>
						</View>
					</View>
				</View>
				</View>
				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  upperActivityView: {
  	flex: 2,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  scrollView: {
  	height: Dimensions.get("window").height * 0.9
  },
  lowerActivityView: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center'
  },
  lowerActivityItemView: {
  	padding: 5,
  	alignItems: 'center'
  },
  co2Icon: {
  	height: 100,
  	width: 100
  },
  mediumText: {
  	fontSize: 25
  },
  smallText: {
  	fontSize: 12,
  	paddingLeft: 5,
  	paddingBottom: 5
  },
  smallGreenText: {
  	fontSize: 12,
  	color: 'green',
  	paddingLeft: 5,
  	paddingBottom: 5
  },
  subText: {
  	fontSize: 9,
    paddingBottom: 4
  },
  hrView: {
  	flexDirection: 'row',
  	alignItems: 'flex-end'
  },
  largeActivity_icon: {
    height: 250,
    borderRadius: 125,
    width: 250,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  activity_icon: {
    height: 50,
    borderRadius: 25,
    width: 50,
    backgroundColor: '#009688',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenDot: {
  	height: 10,
    borderRadius: 5,
    width: 10,
    backgroundColor: 'green',
    marginLeft: 30,
    marginBottom: 8
  },
  blackDot: {
  	height: 10,
    borderRadius: 5,
    width: 10,
    backgroundColor: '#616161',
    marginBottom: 8
  }
});