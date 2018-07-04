import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 *  Map to show Users
 * @param  props properties from parent class
 */
const StaticMap = props => {
    const markers = (location, id) => {
        let color = !id ? 'red' : 'green';
        return (
            <MapView.Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
                pinColor={color}
            />
        );
    };

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={props.region}
            style={styles.map}
        >
            {props.source ? markers(props.source, 0) : null}
            {props.destination ? markers(props.destination, 1) : null}
            {props.coords ? (
                <MapView.Polyline
                    coordinates={props.coords}
                    strokeWidth={4}
                    strokeColor="#666"
                />
            ) : null}
        </MapView>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
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
}

export default StaticMap;
