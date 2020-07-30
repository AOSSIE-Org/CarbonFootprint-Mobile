import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { returnHeightOfStatusBar } from '../components/StatusBarBackground';

import { mapboxKey } from '../config/keys';
import { useDispatch, useSelector } from 'react-redux';
import {
    getRedMarkerDetails,
    getGreenMarkerDetails,
    getDirections
} from '../config/actionDispatcher';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(mapboxKey);

const StaticMap = props => {
    const [statusBarHeight, setStatusBarHeight] = useState(18);
    const [zoom, setZoom] = useState(15);
    const [source, setSource] = useState(props.source);
    const [destination, setDestiation] = useState(props.destination);
    const [cameraConfig, setCameraConfig] = useState({ followUserLocation: true });
    const dispatch = useDispatch();
    const storage = useSelector(state => state.storage);
    const firstRenderRed = useRef(true);
    const firstRenderGreen = useRef(true);

    useEffect(() => {
        setSource(props.source);
        if (props.source) {
            setCameraConfig({
                triggerKey: Date.now(),
                animationMode: MapboxGL.Camera.Mode.Flight,
                animationDuration: 2000,
                centerCoordinate: [props.source.longitude, props.source.latitude],
                followUserLocation: false
            });
        }
        if (props.destination) {
            setDestiation(props.destination);
            setZoom(10);
        }
    }, [props.source, props.destination]);

    useEffect(() => {
        function updateRedMarker() {
            fetch(
                'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                    source.longitude +
                    ',' +
                    source.latitude +
                    '.json?access_token=' +
                    mapboxKey
            )
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(
                        getRedMarkerDetails(
                            source,
                            JSON.stringify(responseJson.features[0].place_name)
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
                'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                    destination.longitude +
                    ',' +
                    destination.latitude +
                    '.json?access_token=' +
                    mapboxKey
            )
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(
                        getGreenMarkerDetails(
                            destination,
                            JSON.stringify(responseJson.features[0].place_name)
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
            <MapboxGL.PointAnnotation
                id="source"
                draggable={true}
                coordinate={[location.longitude, location.latitude]}
                pinColor={color}
                onDragEnd={e => {
                    let coord = {
                        latitude: e.geometry.coordinates[1],
                        longitude: e.geometry.coordinates[0]
                    };
                    setSource(coord);
                }}
            />
        );
    };
    const greenMarker = (location, color) => {
        return (
            <MapboxGL.PointAnnotation
                id="destination"
                draggable={true}
                coordinate={[location.longitude, location.latitude]}
                pinColor={color}
                onDragEnd={e => {
                    let coord = {
                        latitude: e.geometry.coordinates[1],
                        longitude: e.geometry.coordinates[0]
                    };
                    setDestiation(coord);
                }}
            />
        );
    };

    const styleMap = () => {
        if (storage.data.map) {
            if (storage.data.map === 'Dark') {
                return MapboxGL.StyleURL.Dark;
            } else if (storage.data.map === 'Light') {
                return MapboxGL.StyleURL.Light;
            } else if (storage.data.map === 'Outdoors') {
                return MapboxGL.StyleURL.Outdoors;
            } else if (storage.data.map === 'Satellite') {
                return MapboxGL.StyleURL.Satellite;
            } else if (storage.data.map === 'SatelliteStreet') {
                return MapboxGL.StyleURL.SatelliteStreet;
            }
            return MapboxGL.StyleURL.Street;
        }
        return MapboxGL.StyleURL.Street;
    };

    const layerStyle = {
        route: {
            lineColor: 'black',
            lineCap: 'round',
            lineWidth: 4,
            lineOpacity: 0.64
        }
    };

    return (
        <View style={styles.mapContainer}>
            <MapboxGL.MapView
                styleURL={styleMap()}
                compassEnabled={true}
                rotateEnabled={true}
                style={styles.map}
            >
                <MapboxGL.Camera {...cameraConfig} zoomLevel={15} />
                <MapboxGL.UserLocation />
                {props.source ? redMarker(props.source, 'red', props) : null}
                {props.destination ? greenMarker(props.destination, 'green', props) : null}
                {props.coords ? (
                    <MapboxGL.ShapeSource id="routeSource" shape={props.coords}>
                        <MapboxGL.LineLayer
                            id="routeFill"
                            style={layerStyle.route}
                            layerIndex={100}
                        />
                    </MapboxGL.ShapeSource>
                ) : null}
            </MapboxGL.MapView>
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
