/*
    This is for showing current user activity.
    It will display current detected activity, traveled distance and time, CO2 details at runtime.
    It will also have an option to detect or manually modify activity (in case of wrong detection of activity).
    Used External package - 'react-native-maps', 'haversine'
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import pick from 'lodash/pick';
import haversine from 'haversine';
import MapView from 'react-native-maps';
import BackgroundJob from 'react-native-background-job';

import { ZOOM_DELTA } from '../config/helper';
import { googleRoadsAPIKey } from '../config/keys';

const backgroundJob = {
 jobKey: "myJob",
 job: () => {
    //console.log("********************************************************************************Running in background*********************************************************************************************************************")
    this.drawRoute();
  }
};

BackgroundJob.register(backgroundJob);

export default class ActivityTab extends Component {
	constructor(props) {
		super(props);
    this.state = {
      time: 0, // For travel time
      numCoords: 0,
      routeCoordinates: [], // For drawing route
      distanceTravelled: 0, // For traveled distance
      prevLatLng: {} // Previous location
    };
    // Incrementing time
    setInterval(() => {this.setState({time: this.state.time + 1})}, 1000);

    this.processSnapToRoadResponse = this.processSnapToRoadResponse.bind(this);
    setInterval(() => {this.drawRoute()}, 5000);
	}

  drawRoute() {
    // Google Roads API
    var newRouteCoords = [];

    var len = this.state.routeCoordinates.length;
    //var diff = len - this.state.numCoords;
//    if(len > 0 && diff >= 90 && diff <= 100) {
      var baseUrl = "https://roads.googleapis.com/v1/snapToRoads?path=";
      for(var i = this.state.numCoords; i < len - 1; i ++)
        baseUrl += this.state.routeCoordinates[i].latitude + "," + this.state.routeCoordinates[i].longitude + "|";
      baseUrl += this.state.routeCoordinates[len - 1].latitude + "," + this.state.routeCoordinates[len - 1].longitude;
      baseUrl += "&interpolate=true&key=" + googleRoadsAPIKey;

      fetch(baseUrl).then((response) => response.json())
            .then((response) => {
          this.processSnapToRoadResponse(response);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
   // }
  }

  // Store snapped polyline returned by the snap-to-road service.
  processSnapToRoadResponse(data) {
    snappedCoordinates = [];
    //alert("Points: " + data.snappedPoints.length);
    for (var i = 0; data.snappedPoints != undefined && i < data.snappedPoints.length; i++) {
      const latlng = pick(data.snappedPoints[i].location, ['latitude', 'longitude']);
      snappedCoordinates.push(latlng);
    }
    var tempCoords = this.state.routeCoordinates.slice();
    var len = snappedCoordinates.length;
    var num = this.state.numCoords;
    for(var i = 0; i < len; i ++)
      tempCoords[i + num] = snappedCoordinates[i];
    this.setState({numCoords: num + len - 1, routeCoordinates: tempCoords});
  }

  componentDidMount() {
    BackgroundJob.cancelAll();
    // Getting current location (One-time only)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //alert("Position - " + "latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude);
        this._map.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: ZOOM_DELTA,
          longitudeDelta: ZOOM_DELTA
        }, 2);
      },
      (error) => alert(error.message)
    );

    // Getting location updates (Only when location changes)
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled } = this.state;
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude };
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      this._map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: ZOOM_DELTA,
        longitudeDelta: ZOOM_DELTA
      }, 2);

      console.log("location location location location location location location - " + position.coords.latitude + " " + position.coords.longitude);

      // Updating state
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs
      });
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter:1}
    );
  }

  componentWillMount() {

    // Starting Activity Detection
    this.props.startActivityDetection();
  }

  componentWillUnmount() {

    // Closing Activity Detection
    //this.props.closeActivityDetection();

    // Stop getting location updates
    //navigator.geolocation.clearWatch(this.watchID);

    BackgroundJob.schedule({
      jobKey: "myJob",
      period: 5000,
      timeout: 5000,
      networkType: BackgroundJob.NETWORK_TYPE_UNMETERED
    });
  }

  // Calculating traveled distance at runtime using Haversine formula
  calcDistance(newLatLng) {
    const { prevLatLng } = this.state;
    return (haversine(prevLatLng, newLatLng) || 0);
  }

  // Updating travel time
  updateTime() {
    if(this.state.time < 60) {
      return {time: this.state.time, unit: "s"};
    } else {
      if(this.state.time >= 60 && this.state.time <= 3600)
        return {time: (this.state.time/60).toFixed(1), unit: "min"};
      else
        return {time: (this.state.time/3600).toFixed(1), unit: "hr"};
    }
  }

  // For getting icons based on platform
  getIcon(name) {
    return (Platform.OS === 'android' ? "md-": "ios-") + name;
  }

  // Main function to set whole view of screen
  // ScrollView is added to deal with different sizes of mobile screen.
  // MapView component is added to display Google map showing location of user and source/destination (If entered)
	render() {
    var timeObj = this.updateTime();

    // Selecting activity icon based on detected activity
    var icon;
    switch(this.props.activityType) {
      case 'IN_VEHICLE': {
        icon = "car";
        break;
      }
      case 'ON_BICYCLE': {
        icon = "bicycle";
        break;
      }
      case 'ON_FOOT': {
        icon = "walk";
        break;
      }
      default: {
        icon = "close";
        break;
      }
    }
    const mileage = 50; // km/L
    const rate = 2.328; // in kg/L , For Petrol
    var co2 = rate * (this.state.distanceTravelled / mileage);
    var co2Str = co2.toFixed(2);
		return(
      <ScrollView contentContainerStyle = {styles.scrollView}>
        <MapView
          height={Dimensions.get("window").height * 0.5}
          ref={(map)=>this._map = map}
          showsUserLocation={true} >
          <MapView.Polyline
            coordinates={this.state.routeCoordinates}/>
        </MapView>
        <View style ={styles.container}>
          <View style = {styles.activityView}>
            <TouchableNativeFeedback /*onPress = {() => this.props.startActivityDetection()}*/>
              <View style = {styles.activity_icon}>
                <Icon name={this.getIcon(icon)} size={50} color="white"/>
              </View>
            </TouchableNativeFeedback>
            <Text style = {styles.smallText}> Detected Activity </Text>
            <View style = {styles.hrline} />
          </View>
          <View style = {styles.statsView}>
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>{this.state.distanceTravelled.toFixed(2)}</Text>
                <Text style = {styles.smallText}>km</Text>
              </View>
              <Text style = {styles.smallText}>Travel distance</Text>
            </View>
            <View style = {styles.verline} />
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>{co2Str}</Text>
                <Text style = {styles.smallText}>kg</Text>
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
                <Text style = {styles.largeText}>{timeObj.time}</Text>
                <Text style = {styles.smallText}>{timeObj.unit}</Text>
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
  },
  subText: {
    fontSize: 9,
    paddingTop: 4
  }
});
