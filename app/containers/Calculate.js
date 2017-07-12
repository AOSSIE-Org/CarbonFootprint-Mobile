import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import * as LocationAction from '../actions/LocationAction';
import * as DirectionAction from '../actions/DirectionAction';

import Footer from '../components/Footer';
import StaticMap from '../components/StaticMap';
import FootprintCard from '../components/FootprintCard';

class Calculate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {
                latitude: null,
                longitude: null
            },
            destination: {
                latitude: null,
                longitude: null,
            }
        }
    }

    componentWillMount() {
        this.props.getLocation();
    }

    componentWillReceiveProps(props) {
        let source = props.direction.source;
        let destination = props.direction.destination;
        if (source.latitude) {
            if (destination.latitude) {
                if (!_.isEqual(this.state.source, source) ||
                    !_.isEqual(this.state.destination, destination)) {
                        this.setState({
                            source,
                            destination
                        });
                        props.getDirections(source, destination);
                    }
            }
        }
    }

    render() {
        let direction = this.props.direction;
        let source = direction.source;
        let destination = direction.destination;
        let region = direction.region;
        let coords = direction.coords;
        let map = null;
        
        if (source.latitude) {
            if (destination.latitude) {
                map = <StaticMap source={source} destination={destination}
                        region={region} coords={coords} />
            } else {
                map = <StaticMap source={source} region={region} />
            }
        }

        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />

                {map}

                <View style={styles.button}>
                    <View style={styles.box}>
                        <Icon.Button name={
                                Platform.OS === 'android' ?
                                "md-pin-outline" : "ios-pin-outline"
                            } backgroundColor="#fff" borderRadius={0}
                            size={16} iconStyle={styles.icon}
                            onPress={() => this.props.openSearchModal(0)}>
                            <Text style={styles.text}>{direction.sourceName}</Text>
                        </Icon.Button>
                    </View>
                    <View>
                        <Icon.Button name={
                                Platform.OS === 'android' ?
                                "md-flag-outline" : "ios-flag-outline"
                            } backgroundColor="#fff" borderRadius={0}
                            size={16} iconStyle={styles.icon}
                            onPress={() => this.props.openSearchModal(1)}>
                            <Text style={styles.text}>{direction.destinationName}</Text>
                        </Icon.Button>
                    </View>
                </View>
                {
                    coords ?
                    <FootprintCard distance={direction.distance} duration={direction.duration} />
                    : null
                }
                <Footer name="calculate" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
    },
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    button: {
        backgroundColor: '#fff',
        top: 20,
        marginRight: 20,
        marginLeft: 20,
        zIndex: 1,
        borderColor: '#eee',
        borderWidth: 1,
        shadowColor: '#eee',
    },
    box: {
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    icon: {
        color: '#777',
    },
    text: {
        color: '#999',
        fontSize: 14,
        letterSpacing: 1,
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({},
        LocationAction,
        DirectionAction
    ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculate);
