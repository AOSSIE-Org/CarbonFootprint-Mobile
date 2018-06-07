import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

class StaticMap extends Component {
    constructor(props) {
        super(props);
        this.state = { statusBarHeight: 60 };
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
    componentWillMount() {
     //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
        setTimeout( () => {
            this.setState({ statusBarHeight: 110 })
        });
    }

    render() {
        let props = this.props;
        return(
            <View style={[styles.mapContainer, {marginTop: this.state.statusBarHeight}]}>
                <MapView provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    region={props.region} style={styles.map}>
                    {
                        props.source ?
                        this.markers(props.source, 0): null
                    }
                    {
                        props.destination ?
                        this.markers(props.destination, 1): null
                    }
                    {
                        props.coords ?
                        <MapView.Polyline
                            coordinates={props.coords}
                            strokeWidth={4}
                            strokeColor="#666" />
                        : null
                    }
                </MapView>
            </View>
        )
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
        position: 'absolute',
    }
})


export default StaticMap;
