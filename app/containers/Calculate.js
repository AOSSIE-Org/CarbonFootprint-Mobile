import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    Platform,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import * as LocationAction from '../actions/LocationAction';
import * as DirectionAction from '../actions/DirectionAction';
import * as StorageAction from '../actions/StorageAction';

import Footer from '../components/Footer';
import StaticMap from '../components/StaticMap';
import FootprintCard from '../components/FootprintCard';

import {
    color,
    getIcon,
    calcCo2,
    getMileage,
    getFuelRate
} from '../config/helper';

/**
 * Calculate container
 * @extends Component
 */
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
                longitude: null
            },
            tab: 0
        };
    }

    componentWillMount() {
        if (!this.props.location.latitude) {
            this.props.getLocation();
        }
        // AsyncStorage to Redux since this is the first screen
        this.props.getStorage();
    }

    componentWillReceiveProps(props) {
        let source = props.direction.source;
        let destination = props.direction.destination;
        let tab = this.state.tab;
        // I dare you to remove this condition
        if (source.latitude) {
            if (destination.latitude) {
                if (
                    !_.isEqual(this.state.source, source) ||
                    !_.isEqual(this.state.destination, destination)
                ) {
                    this.setState({
                        source,
                        destination
                    });
                    props.getDirections(source, destination, tab);
                }
            }
        }
    }

    /**
     * call back function when changed vechile type
     * @param  tab number each indicates vechle id check FootprintCard.js
     * @return current tab status
     */
    onChangeTab(tab) {
        let state;
        this.setState({
            tab
        });
        this.props.getDirections(
            this.state.source,
            this.state.destination,
            tab
        );
    }

    render() {
        let direction = this.props.direction;
        let source = direction.source;
        let destination = direction.destination;
        let region = direction.region;
        let coords = direction.coords;
        let map = <StaticMap />;

        if (source.latitude) {
            if (destination.latitude) {
                map = (
                    <StaticMap
                        source={source}
                        destination={destination}
                        region={region}
                        coords={coords}
                    />
                );
            } else {
                map = <StaticMap source={source} region={region} />;
            }
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={color.darkPrimary}
                    barStyle="light-content"
                    hidden={false}
                />
                {
                    /*this.props.location.isFetching?
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color="#538124"/>
                    </View>
                    :*/ map
                }

                <View style={styles.button}>
                    <View style={styles.box}>
                        <Icon.Button
                            name={getIcon('pin')}
                            backgroundColor={color.lightPrimary}
                            borderRadius={2}
                            size={16}
                            iconStyle={styles.icon}
                            onPress={() => this.props.openSearchModal(0)}
                        >
                            <Text style={styles.text}>
                                {direction.sourceName}
                            </Text>
                        </Icon.Button>
                    </View>
                    <View>
                        <Icon.Button
                            name={getIcon('flag')}
                            backgroundColor={color.lightPrimary}
                            borderRadius={2}
                            size={16}
                            iconStyle={styles.icon}
                            onPress={() => this.props.openSearchModal(1)}
                        >
                            <Text style={styles.text}>
                                {direction.destinationName}
                            </Text>
                        </Icon.Button>
                    </View>
                </View>
                {source.latitude && destination.latitude ? (
                    <FootprintCard
                        distance={direction.distance}
                        duration={direction.duration}
                        onChangeTab={this.onChangeTab.bind(this)}
                        footprint={
                            direction.distance.text
                                ? this.state.tab === 0 || this.state.tab === 1
                                    ? calcCo2(
                                          getFuelRate(),
                                          direction.distance.text,
                                          getMileage()
                                      )
                                    : 0
                                : null
                        }
                        tab={this.state.tab}
                        fetching={direction.isFetching}
                    />
                ) : null}
            </View>
        );
    }
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        marginTop: StatusBar.currentHeight
    },
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    button: {
        backgroundColor: color.primary,
        top: 0,
        zIndex: 2,
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 30 : 20
    },
    box: {
        borderBottomWidth: 1,
        borderColor: color.primary
    },
    icon: {
        color: color.grey
    },
    text: {
        color: color.white,
        fontSize: 14,
        letterSpacing: 1
    },
    center: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
})

Calculate.propTypes = {
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getStorage: PropTypes.func.isRequired,
    getDirections: PropTypes.func.isRequired,
    openSearchModal: PropTypes.func.isRequired,
    direction: PropTypes.object
}

function mapStateToProps(state) {
    return {
        location: state.location,
        direction: state.direction
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({}, LocationAction, DirectionAction, StorageAction),
        dispatch
    );
}
//This is needed to allow children components to have access to Actions and store variables
export default connect(mapStateToProps, mapDispatchToProps)(Calculate);
