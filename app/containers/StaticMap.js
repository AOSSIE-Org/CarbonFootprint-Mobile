import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { returnHeightOfStatusBar } from '../components/StatusBarBackground';

import { googleRoadsAPIKey } from '../config/keys';
import { useDispatch } from 'react-redux';
import {
    getRedMarkerDetails,
    getGreenMarkerDetails,
    getDirections
} from '../config/actionDispatcher';

const StaticMap = props => {
    const [statusBarHeight, setStatusBarHeight] = useState(18);
    const [zoom, setZoom] = useState(15);
    const [source, setSource] = useState(props.source);
    const [destination, setDestiation] = useState(props.destination);
    const dispatch = useDispatch();
    const firstRenderRed = useRef(true);
    const firstRenderGreen = useRef(true);

    useEffect(() => {
        setSource(props.source);
        if (props.destination) {
            setDestiation(props.destination);
            setZoom(10);
        }
    }, [props.source, props.destination]);

    useEffect(() => {
        function updateRedMarker() {
            fetch(
                'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    source.latitude +
                    ',' +
                    source.longitude +
                    '&key=' +
                    googleRoadsAPIKey
            )
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(
                        getRedMarkerDetails(
                            source,
                            JSON.stringify(responseJson.results[0].formatted_address)
                        )
                    );
                })
                .catch(error => console.log(error));
        }
        if (firstRenderRed.current) {
            firstRenderRed.current = false;
        } else {
            if (source != null) {
                updateRedMarker();
            }
        }
    }, [source]);

    useEffect(() => {
        function updateGreenMarker() {
            fetch(
                'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    destination.latitude +
                    ',' +
                    destination.longitude +
                    '&key=' +
                    googleRoadsAPIKey
            )
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(
                        getGreenMarkerDetails(
                            destination,
                            JSON.stringify(responseJson.results[0].formatted_address)
                        )
                    );
                    dispatch(getDirections(source, destination, 0));
                })
                .catch(error => console.log(error));
        }
        if (firstRenderGreen.current) {
            firstRenderGreen.current = false;
        } else {
            if (destination != null) {
                updateGreenMarker();
            }
        }
    }, [destination]);

    const redMarker = (location, color) => {
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    setSource(e.nativeEvent.coordinate);
                }}
            />
        );
    };
    const greenMarker = (location, color) => {
        return (
            <MapView.Marker
                draggable
                coordinate={location}
                pinColor={color}
                onDragEnd={e => {
                    setDestiation(e.nativeEvent.coordinate);
                }}
            />
        );
    };

    return (
        <View style={styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                minZoomLevel={zoom}
                loadingEnabled={true}
                region={props.region}
                style={styles.map}
            >
                {props.source ? redMarker(source, 'red', props) : null}
                {props.destination ? greenMarker(destination, 'green', props) : null}
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
};

const styles = StyleSheet.create({
    mapContainer: {
        position: 'absolute',
        top: returnHeightOfStatusBar(),
        right: 0,
        left: 0,
        bottom: 0
    },
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    }
});

export default React.memo(StaticMap);
