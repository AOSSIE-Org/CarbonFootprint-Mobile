import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Polyline from '@mapbox/polyline';
import _ from 'lodash';

class StaticMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
            distance: null,
            source: null,
            destination: null,
        };
    }

    formatLocation(x) {
        return x.latitude.toString() + ',' +
            x.longitude.toString();
    }

    getDirections(source, destination) {
        let start = this.formatLocation(source);
        let end = this.formatLocation(destination);
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?travelmode=transit&origin=${start}&destination=${end}`)
            .then(response => response.json())
            .then(json => {
                // Handle case for routes not found
                let distance = json.routes[0].legs[0].distance.value;
                let points = Polyline.decode(json.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return  {
                        latitude : point[0],
                        longitude : point[1]
                    }
                });
                this.setState({
                    distance,
                    coords
                });
            })
            .catch(error => console.log(error))
    }

    markers(location, id) {
        let color = !id ?
            "red": "green";
        return (
            <MapView.Marker coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
            }} pinColor={color}/>
        )
    }
    /* This is not a good way to return
     * Have to take Earth's Spherical Nature into account
     */
    getRegion(source, destination) {
        minX = Math.min(source.latitude, destination.latitude);
        minY = Math.min(source.longitude, destination.longitude);
        maxX = Math.max(source.latitude, destination.latitude);
        maxY = Math.max(source.longitude, destination.longitude);
        return {
            latitude: (minX + maxX) / 2,
            longitude: (minY + minY) / 2,
            latitudeDelta: (maxX - minX),
            longitudeDelta: (maxY - minY)
        }
    }

    render() {
        const props = this.props;
        let region = {
            latitude: props.source.latitude,
            longitude: props.source.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0322
        }

        if (props.source && props.destination) {
            if (!_.isEqual(props.source, this.state.source) ||
                !_.isEqual(props.destination, this.state.destination)) {
                    this.setState({
                        source: props.source,
                        destination: props.destination
                    })
                    this.getDirections(props.source, props.destination);
                    region = this.getRegion(props.source, props.destination);
            }
        }

        return(
            <MapView provider={PROVIDER_GOOGLE}
                region={region} style={styles.map}>
                {
                    props.source ?
                    this.markers(props.source, 0): null
                }
                {
                    props.destination ?
                    this.markers(props.destination, 1): null
                }
                {
                    this.state.coords ?
                    <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={4}
                        strokeColor="#666" />
                    : null
                }
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
})

export default StaticMap;
