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
  Platform
} from 'react-native';
// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import pick from 'lodash/pick';
import haversine from 'haversine';
import MapView from 'react-native-maps';
import BackgroundJob from 'react-native-background-job';
import { ZOOM_DELTA, MILEAGE, RATE } from '../config/constants';
import { googleRoadsAPIKey } from '../config/keys';
import { getIcon, getIconName, color, calcCo2 } from '../config/helper';

const backgroundJob = {
 jobKey: "myJob",
 job: () => {
    this.drawRoute();
  }
};

BackgroundJob.register(backgroundJob);

export default class ActivityTab extends Component {
	constructor(props) {
		super(props);
    this.state = {
      numCoords: 0, 
      routeCoordinates: [], // For drawing route
      prevLatLng: {}
    };
    // Incrementing time
    setInterval(() => {
      this.updateDuration()
    }, 1000);

    this.processSnapToRoadResponse = this.processSnapToRoadResponse.bind(this);
    setInterval(() => {this.drawRoute()}, 5000);
	}

  updateDuration() {
    if(this.props.activity.type !== 'STILL' && this.props.activity.type !== 'TILTING' && this.props.activity.type !== 'UNKNOWN')
      this.props.setDuration(this.props.activity.duration + 1);
  }

  drawRoute() {
    // Google Roads API
    var newRouteCoords = [];

    var len = this.state.routeCoordinates.length;
    if(len > 0) {
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
        alert("Error (ActivityTab/drawRoute): " + error);
      });
   }
  }

  // Store snapped polyline returned by the snap-to-road service.
  processSnapToRoadResponse(data) {
    snappedCoordinates = [];
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
        const currLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        this.props.setSrc(currLatLngs);
        //alert("Source set " + this.props.src.latitude + ", " + this.props.src.longitude);
        this._map.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: ZOOM_DELTA,
          longitudeDelta: ZOOM_DELTA
        }, 2);
      },
      (error) => alert("ActivityTab (componentDidMount 1): " + error.message)
    );

    // Getting location updates (Only when location changes)
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates } = this.state; 
      //alert("Destination set " + ", latitude: " + position.coords.latitude);
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude };
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      this._map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: ZOOM_DELTA,
        longitudeDelta: ZOOM_DELTA
      }, 2);   

      if(this.props.activity.type !== 'STILL' && this.props.activity.type !== 'TILTING' && this.props.activity.type !== 'UNKNOWN') {
        this.props.setDistance(this.props.activity.distance + this.calcDistance(newLatLngs));
        this.props.setCO2(calcCo2(RATE, this.props.activity.distance, MILEAGE));
        this.props.setDest(newLatLngs);

        // Updating state
        this.setState({
          routeCoordinates: routeCoordinates.concat(positionLatLngs),
          prevLatLng: newLatLngs
        });
      }
    },
    (error) => alert("ActivityTab (componentDidMount 2): " + error.message),
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
    if(this.props.activity.duration < 60) {
      return {time: this.props.activity.duration, unit: "s"};
    } else {
      if(this.props.activity.duration >= 60 && this.props.activity.duration <= 3600)
        return {time: (this.props.activity.duration/60).toFixed(1), unit: "min"};
      else
        return {time: (this.props.activity.duration/3600).toFixed(1), unit: "hr"};
    }
  }

  // Main function to set whole view of screen
  // ScrollView is added to deal with different sizes of mobile screen.
  // MapView component is added to display Google map showing location of user and source/destination (If entered)
	render() {
    var timeObj = this.updateTime();
    var icon = getIconName(this.props.activity.type);

		return(
      <ScrollView contentContainerStyle = {styles.scrollView}>
        <View style={styles.mapView}>
          <MapView
            style={styles.mapView}
            ref={(map)=>this._map = map}
            showsUserLocation={true} >
            <MapView.Polyline 
              coordinates={this.state.routeCoordinates}/>
          </MapView>
        </View>
        <View style ={styles.container}>
          <View style = {styles.activityView}>
            <View style = {styles.activity_icon}>
              {(this.props.activity.type === 'RUNNING') ? <Icon1 name={icon} size={50} color="white"/> : <Icon name={getIcon(icon)} size={50} color="white"/>}
            </View>
            <Text style = {styles.smallText}> Detected Activity </Text>
            <View style = {styles.hrline} />
          </View>
          <View style = {styles.statsView}>
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>{this.props.activity.distance.toFixed(2)}</Text>
                <Text style = {styles.smallText}>km</Text>
              </View>
              <Text style = {styles.smallText}>Travel distance</Text>
            </View>
            <View style = {styles.verline} />
            <View style = {styles.statsViewItems}>
              <View style = {styles.statsViewItems1}>
                <Text style = {styles.largeText}>{this.props.activity.co2.toFixed(2)}</Text>
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

  mapView: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").height
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
    backgroundColor: color.primary,
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
