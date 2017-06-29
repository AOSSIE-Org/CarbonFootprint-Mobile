import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import * as LocationAction from '../actions/LocationAction';

import Footer from '../components/Footer';
import StaticMap from '../components/StaticMap';
import RNGooglePlaces from 'react-native-google-places';

class Calculate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {
                latitude: null,
                longitude: null,
                name: ""
            },
            destination: {
                latitude: null,
                longitude: null,
                name: "Where to?"
            }
        }
    }

    componentWillMount() {
        this.props.getLocation();
    }

    componentWillReceiveProps(props) {
        let source = this.state.source;
        source.latitude = props.location.latitude;
        source.longitude = props.location.longitude;
        source.name = "Your Location";
        this.setState({source});
    }

    openSearchModal(key) {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                let data = this.state[key];
                data.latitude = place.latitude;
                data.longitude = place.longitude;
                data.name = place.name;
                this.setState({ [key]: data });
            })
            .catch(error => {
                console.log(error.message);
            });
       return;
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {
                    this.state.source.latitude && !this.state.destination.latitude ?
                    <StaticMap source={this.state.source} />
                    : null
                }
                {
                    this.state.source.latitude && this.state.destination.latitude ?
                    <StaticMap source={this.state.source} destination={this.state.destination} />
                    : null
                }

                <View style={styles.button}>
                    <View style={styles.box}>
                        <Icon.Button name="ios-pin-outline" backgroundColor="#fff" borderRadius={0}
                            size={16} iconStyle={styles.icon} onPress={() => this.openSearchModal("source")}>
                            <Text style={styles.text}>{this.state.source.name}</Text>
                        </Icon.Button>
                    </View>
                    <View>
                        <Icon.Button name="ios-flag-outline" backgroundColor="#fff" borderRadius={0}
                            size={16} iconStyle={styles.icon} onPress={() => this.openSearchModal("destination")}>
                            <Text style={styles.text}>{this.state.destination.name}</Text>
                        </Icon.Button>
                    </View>
                </View>
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
    return bindActionCreators(Object.assign({}, LocationAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculate);
