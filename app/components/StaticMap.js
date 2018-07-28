import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as DirectionAction from '../actions/DirectionAction';
import { getRegion, getDirections } from '../actions/DirectionAction';
import { connect } from 'react-redux';
import { googleRoadsAPIKey } from '../config/keys';
class StaticMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 60,
            zoom: 15,
            source: this.props.source,
            destination: this.props.destination
        };
    }

    redMarker(location, color, props) {
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    this.setState(
                        { source: e.nativeEvent.coordinate },
                        function() {
                            fetch(
                                'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                                    this.state.source.latitude +
                                    ',' +
                                    this.state.source.longitude +
                                    '&key=' +
                                    googleRoadsAPIKey
                            )
                                .then(response => response.json())
                                .then(responseJson => {
                                    props.customFunction(
                                        this.state.source,
                                        JSON.stringify(
                                            responseJson.results[0]
                                                .formatted_address
                                        )
                                    );
                                });
                        }
                    );
                }}
            />
        );
    }
    greenMarker(location, color, props) {
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    this.setState(
                        {
                            destination: e.nativeEvent.coordinate
                        },
                        function() {
                            fetch(
                                'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                                    this.state.destination.latitude +
                                    ',' +
                                    this.state.destination.longitude +
                                    '&key=' +
                                    googleRoadsAPIKey
                            )
                                .then(response => response.json())
                                .then(responseJson => {
                                    props.customFunction2(
                                        this.state.destination,
                                        JSON.stringify(
                                            responseJson.results[0]
                                                .formatted_address
                                        )
                                    );
                                    props.getDirections(
                                        this.state.source,
                                        this.state.destination,
                                        0
                                    );
                                });
                        }
                    );
                }}
            />
        );
    }
    componentWillMount() {
        //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
        setTimeout(() => {
            this.setState({ statusBarHeight: 110 });
        }, 500);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState({
                source: nextProps.source
            });
        }
        if (nextProps.destination) {
            this.setState({
                source: nextProps.source,
                destination: nextProps.destination,
                zoom: 10
            });
        }
    }

    render() {
        let props = this.props;
        return (
            <View
                style={[
                    styles.mapContainer,
                    { marginTop: this.state.statusBarHeight }
                ]}
            >
                <MapView
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    minZoomLevel={this.state.zoom}
                    loadingEnabled={true}
                    region={props.region}
                    style={styles.map}
                >
                    {props.source
                        ? this.redMarker(this.state.source, 'red', props)
                        : null}
                    {props.destination
                        ? this.greenMarker(
                              this.state.destination,
                              'green',
                              props
                          )
                        : null}
                    {props.coords ? (
                        <MapView.Polyline
                            coordinates={props.coords}
                            strokeWidth={4}
                            strokeColor="#666"
                        />
                    ) : null}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: 430
    },
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    }
});

StaticMap.propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    coords: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, DirectionAction), dispatch);
}
export default connect(
    null,
    mapDispatchToProps
)(StaticMap);
