import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as DirectionAction from '../actions/DirectionAction';
import { getRegion, getDirections } from '../actions/DirectionAction';
import { connect } from 'react-redux';
class StaticMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 60,
            source: null,
            destination: null
        };
    }

    markers(location, id, props) {
        let color = !id ? 'red' : 'green';
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    this.setState({ source: e.nativeEvent.coordinate });
                    props.customFunction(location);
                }}
            />
        );
    }
    marker(location, id, props) {
        let color = !id ? 'red' : 'green';
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    this.setState({
                        destination: e.nativeEvent.coordinate
                    });
                    props.customFunction2(location);
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
                destination: nextProps.destination
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
                    region={props.region}
                    style={styles.map}
                >
                    {props.source
                        ? this.markers(this.state.source, 0, props)
                        : null}
                    {props.destination
                        ? this.marker(this.state.destination, 1, props)
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
