/*
    This is for showing current user activity.
    It will display current detected activity, traveled distance and time, CO2 details at runtime.
    It will also have an option to detect or manually modify activity (in case of wrong detection of activity).
    Used External package - 'react-native-maps'
*/

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
import MapView from 'react-native-maps';

export default class ActivityTab extends Component {
	constructor(props) {
		super(props);
	}

  // Main function to set whole view of screen
  // ScrollView is added to deal with different sizes of mobile screen.
  // MapView component is added to display Google map showing location of user and source/destination (If entered)
	render() {
		return(
      <ScrollView contentContainerStyle = {styles.scrollView}> 
        <MapView
          height={Dimensions.get("window").height * 0.5}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0030,
            longitudeDelta: 0.0030,
          }} >
          <MapView.Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="Source"
            description="Source" /> 
          <MapView.Marker
            coordinate={{latitude: 37.78800, longitude: -122.4300}}
            pinColor="green"
            title="Destination"
            description="Destination" />
          <MapView.Polyline 
            coordinates={[{latitude: 37.78825, longitude: -122.4324}, {latitude: 37.78800, longitude: -122.4300}]}
            strokeWidth={5}
            strokeColor="#ffb74d" />
        </MapView>
        <View style ={styles.container}>
          <View style = {styles.activityView}>
            <TouchableNativeFeedback onPress = {() => this.props.detectActivity()}>
              <View style = {styles.activity_icon}>
                <Icon name="md-car" size={50} color="white"/>
              </View>
            </TouchableNativeFeedback>
            <Text style = {styles.smallText}> Detected Activity </Text>
            <View style = {styles.hrline} />
          </View>
          <View style = {styles.statsView}>
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>12</Text>
                <Text style = {styles.smallText}>km</Text>
              </View>
              <Text style = {styles.smallText}>Travel distance</Text>
            </View>
            <View style = {styles.verline} />
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>30</Text>
                <Text style = {styles.smallText}>g</Text>
              </View>
              <View style = {styles.hrView}>
               <Text style = {styles.smallText}>CO</Text>
               <Text style = {styles.subText}>2</Text>
               <Text style = {styles.smallText}> emitted</Text>
              </View>
            </View>
            <View style = {styles.verline} />
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>10</Text>
                <Text style = {styles.smallText}>min</Text>
              </View>
              <Text style = {styles.smallText}>Travel time</Text>
            </View>
          </View>
        </View>
      </ScrollView>
		);
	}
}

// For styling the screen
const styles = StyleSheet.create({
  // Container for whole screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  // For giving fixed height to ScrollView
  scrollView: {
    height: Dimensions.get("window").height * 0.9
  },
  activityView: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  // For activity stats - Traveled distance, time and CO2 details
  statsView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  activity_icon: {
    marginTop: 10,
    height: 80,
    borderRadius: 40,
    width: 80,
    backgroundColor: '#009688',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hrline: {
    width: 325,
    height: 1,
    borderColor: '#f5f5f5',
    borderWidth: 1
  },
  hrView: {
    flexDirection: 'row'
  },
  statsViewItems: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statsViewItems1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  verline: {
    width: 1,
    height: 80,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    paddingBottom: 13
  },
  smallText: {
    paddingBottom: 13,
    fontSize: 12,
    color: '#78909c'
  },
  largeText: {
    paddingRight: 5,
    fontSize: 45,
    color: '#37474f',
    fontFamily: 'sans-serif'
  },
  subText: {
    fontSize: 9,
    paddingTop: 4
  }
});