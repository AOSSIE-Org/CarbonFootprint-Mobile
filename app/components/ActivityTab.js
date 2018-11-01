/*
 * To show current user activity
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
  TouchableOpacity
} from 'react-native';

// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import pick from 'lodash/pick';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { ZOOM_DELTA } from '../config/constants';
import {
  getIcon,
  getIconName,
  color,
  calcCo2,
  getMileage,
  getFuelRate,
  checkGPS
} from '../config/helper';

import { getPermission } from '../actions/LocationAction';
import haversine from 'haversine';
import { googleRoadsAPIKey } from '../config/keys';

export default class ActivityTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCoords: 0,
      routeCoordinates: [], // For drawing route
      prevLatLng: {}
    };
    // Incrementing time
    /*
    setInterval(() => {
      this.updateDuration()
    }, 1000);
    */
    this.processSnapToRoadResponse = this.processSnapToRoadResponse.bind(this);
    /*
    setInterval(() => {
      var res = this.drawRoute(this.state.routeCoordinates, this.state.numCoords);
      this.setState({
        numCoords: res.numCoords,
        routeCoordinates: res.routeCoordinates
      });
    }, 5000);
    */
  }
  /**
   * Google Roads API logic to send route details to api for more visit https://developers.google.com/maps/documentation/roads/snap
   * @param  array routeCoordinates coordinates of route
   * @param  number numCoords       number of coordinates //0
   * @return json response from API
   */
  drawRoute(routeCoordinates, numCoords) {
    var newRouteCoords = [];
    var len = routeCoordinates.length;
    if (len > 0) {
      var baseUrl = 'https://roads.googleapis.com/v1/snapToRoads?path=';
      for (var i = numCoords; i < len - 1; i++)
        baseUrl +=
          routeCoordinates[i].latitude +
          ',' +
          routeCoordinates[i].longitude +
          '|';
      baseUrl +=
        routeCoordinates[len - 1].latitude +
        ',' +
        routeCoordinates[len - 1].longitude;
      baseUrl += '&interpolate=true&key=' + googleRoadsAPIKey;
      fetch(baseUrl)
        .then(response => response.json())
        .then(response => {
          this.processSnapToRoadResponse(routeCoordinates, numCoords, response);
        })
        .catch(error => {
          //console.log("Error (ActivityTab/drawRoute): " + error);
        });
    }
  }

  /**
   * Store snapped polyline returned by the snap-to-road service.
   * @param  stringarray routeCoordinates coordinates of route to pass to API
   * @param  number numCoords  number of coordinates //0
   * @param  json data  json response from GOOGLE ROADS API
   * @return  routeCoordinates and numCoords new state of application
   */
  processSnapToRoadResponse(routeCoordinates, numCoords, data) {
    snappedCoordinates = [];
    for (
      var i = 0;
      data.snappedPoints != undefined && i < data.snappedPoints.length;
      i++
    ) {
      const latlng = pick(data.snappedPoints[i].location, [
        'latitude',
        'longitude'
      ]);
      snappedCoordinates.push(latlng);
    }
    var tempCoords = routeCoordinates.slice();
    var len = snappedCoordinates.length;
    var num = numCoords;
    for (var i = 0; i < len; i++) tempCoords[i + num] = snappedCoordinates[i];
    this.setState({
      numCoords: num + len - 1,
      routeCoordinates: tempCoords
    });
  }

  /**
   * Calculating traveled distance at runtime using Haversine formula
   * @param  jsonobject prevLatLng prev latitude and longitude
   * @param  jsonobject newLatLng  new latitude and longitude
   * @return haversine formula
   */
  calcDistance(prevLatLng, newLatLng) {
    return haversine(prevLatLng, newLatLng) || 0;
  }

  /**
   * Calculating total activity time interms of hours,minutes and seconds
   * @param   duration total duration of activity
   * @return time  interms of hours , minutes and seconds
   */
  updateTime(duration) {
    if (duration < 60) {
      return { time: duration, unit: 's' };
    } else {
      if (duration >= 60 && duration <= 3600)
        return { time: (duration / 60).toFixed(1), unit: 'min' };
      else return { time: (duration / 3600).toFixed(1), unit: 'hr' };
    }
  }

  /**
   * Getting current location (One-time only)
   * @return Promise updating current location
   */
  async componentDidMount() {
    let value = true;
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      value = await getPermission();
    }
    checkGPS();
    if (value) {
      this.getCurrentLocation = navigator.geolocation.getCurrentPosition(
        position => {
          const currLatLngs = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.props.setSrc(currLatLngs);
          this._map.animateToRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: ZOOM_DELTA,
              longitudeDelta: ZOOM_DELTA
            },
            2
          );
          console.log(position);
        },
        error => {
          //console.log(error.message);
        }
      );
      /**
       * Getting location updates (Only when location changes
       */
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          const { routeCoordinates } = this.state;
          const newLatLngs = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          const positionLatLngs = pick(position.coords, [
            'latitude',
            'longitude'
          ]);
          this._map.animateToRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: ZOOM_DELTA,
              longitudeDelta: ZOOM_DELTA
            },
            2
          );

          if (
            this.props.activity.type !== 'STILL' &&
            this.props.activity.type !== 'TILTING' &&
            this.props.activity.type !== 'UNKNOWN'
          ) {
            this.props.setDistance(
              this.props.activity.distance +
                this.calcDistance(this.state.prevLatLng, newLatLngs)
            );
            this.props.setCO2(
              calcCo2(
                getFuelRate(),
                this.props.activity.distance.toString(),
                getMileage()
              )
            );
            this.props.setDest(newLatLngs);
            this.setState({
              routeCoordinates: routeCoordinates.concat(positionLatLngs),
              prevLatLng: newLatLngs
            });
          }
        },
        error => {
          //console.log(error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
          distanceFilter: 1
        }
      );
    }
  }

  /**
   * lifecycle method called only one time before initial render
   * @return updating props to start activity detection
   */
  componentWillMount() {
    this.props.startActivityDetection();
  }

  /**
   * the last function to be called immediately before the component is removed from the DOM
   * @return closing activity detection
   */
  componentWillUnmount() {
    this.props.closeActivityDetection();
    // Stop getting location updates
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    var timeObj = this.updateTime(this.props.activity.duration);
    var icon = getIconName(this.props.activity.type);

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mapView}>
          <MapView
            style={styles.mapView}
            ref={map => (this._map = map)}
            showsMyLocationButton={true}
            showsUserLocation={true}
          >
            <MapView.Polyline coordinates={this.state.routeCoordinates} />
          </MapView>
          <TouchableOpacity 
            style={styles.currentLocationButton} 
          >
            <Icon name="locate" style={styles.currentLocationIcon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.activityView}>
            <View style={styles.activity_icon}>
              {this.props.activity.type === 'RUNNING' ? (
                <Icon1 name={icon} size={50} color="white" />
              ) : (
                <Icon name={getIcon(icon)} size={50} color="white" />
              )}
            </View>
            <Text style={styles.smallText}> Detected Activity </Text>
            <View style={styles.hrline} />
          </View>
          <View style={styles.dashboardView}>
            <View style={styles.dashboardViewItems}>
              <View style={styles.dashboardViewItems1}>
                <Text style={styles.largeText}>
                  {this.props.activity.distance.toFixed(2)}
                </Text>
                <Text style={styles.smallText}>km</Text>
              </View>
              <Text style={styles.smallText}>Travel distance</Text>
            </View>
            <View style={styles.verline} />
            <View style={styles.dashboardViewItems}>
              <View style={styles.dashboardViewItems1}>
                <Text style={styles.largeText}>
                  {this.props.activity == 'IN_VEHICLE'
                    ? this.props.activity.co2.toFixed(2)
                    : '0.00'}
                </Text>
                <Text style={styles.smallText}>kg</Text>
              </View>
              <View style={styles.hrView}>
                <Text style={styles.smallText}>CO</Text>
                <Text style={styles.subText}>2</Text>
                <Text style={styles.smallText}> emitted</Text>
              </View>
            </View>
            <View style={styles.verline} />
            <View style={styles.dashboardViewItems}>
              <View style={styles.dashboardViewItems1}>
                <Text style={styles.largeText}>{timeObj.time}</Text>
                <Text style={styles.smallText}>{timeObj.unit}</Text>
              </View>
              <Text style={styles.smallText}>Travel time</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

/* StyleSheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mapView: {
    height: Dimensions.get('window').height * 0.45,
    width: Dimensions.get('window').height
  },
  scrollView: {
    height: Dimensions.get('window').height * 0.9
  },
  activityView: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  dashboardView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
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
  dashboardViewItems: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dashboardViewItems1: {
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
    color: '#37474f'
  },
  subText: {
    fontSize: 9,
    paddingTop: 4
  },
  currentLocationButton: {
    backgroundColor: '#efefef', 
    height: 35, 
    width: 35, 
    position: 'absolute', 
    justifyContent: 'center', 
    margin: 10, 
    alignItems: 'center', 
    elevation: 3, 
    borderRadius: 2 
  },
  currentLocationIcon:{
    width: 22, 
    height: 22, 
    tintColor: '#464749' 
  }
});

ActivityTab.propTypes = {
  setSrc: PropTypes.func.isRequired,
  setCO2: PropTypes.func.isRequired,
  setDistance: PropTypes.func,
  setDest: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
  startActivityDetection: PropTypes.func.isRequired
};
