import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    Text,
    ActivityIndicator,
    BackHandler,
    StatusBar
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Picker from 'react-native-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import * as StorageAction from '../actions/StorageAction';
import ProfileHeader from '../components/ProfileHeader';
import { color, newColors } from '../config/helper';

/**
 * Settings Screen Container
 * @extends Component
 */
class Settings extends Component {
    constructor(props) {
        super(props);
        let data = this.props.storage.data;
        this.state = {
            ...data,
            isPickerOn: false
        };
    }

    handlePress(array, value, key) {
        if (value != 0) {
            let data = this.state;
            data[key] = array[value];
            this.setState({
                ...data
            });
            this.props.setStorage(data);
        }
    }

    backPress() {
        let isPickerOn = this.state.isPickerOn;
        if (isPickerOn) {
            Picker.hide();
            this.setState({ isPickerOn: false });
        } else {
            Actions.pop();
        }
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.backPress());
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.backPress());
    }

    showPicker() {
        let isPickerOn = this.state.isPickerOn;
        Picker.init({
            pickerData: [values, units],
            selectedValue: [this.state.value, this.state.unit],
            pickerConfirmBtnText: 'Select',
            pickerCancelBtnText: 'Cancel',
            pickerTitleText: 'Mileage',
            onPickerConfirm: data => {
                this.setState({
                    value: data[0],
                    unit: data[1]
                });
                this.props.setStorage({
                    ...this.state,
                    value: data[0],
                    unit: data[1]
                });
            }
        });
        Picker.show();
        this.setState({ isPickerOn: true });
    }

    reduceState = arr => {
        return arr.reduce((total, el) => {
            return total + ' ' + this.state[el];
        }, '');
    };

    render() {
        var list = [
            {
                option: 'Preferred Automobile',
                state: 'automobile',
                onPress: () => this.AutomobileSheet.show()
            },
            {
                option: 'Fuel Type',
                state: 'type',
                onPress: () => this.TypeSheet.show()
            },
            {
                option: 'Approximate Mileage',
                state: ['value', 'unit'],
                onPress: () => this.showPicker()
            }
        ];

        return (
            <View style={styles.container}>
                <ProfileHeader iconName="long-arrow-left" text="Settings" />
                {this.props.storage.isFetching ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={color.primary} />
                    </View>
                ) : (
                    <View style={styles.main}>
                        {list.map((element, i) => {
                            var res = Array.isArray(element.state)
                                ? this.reduceState(element.state)
                                : this.state[element.state];

                            return (
                                <TouchableHighlight
                                    key={i}
                                    onPress={element.onPress}
                                    activeOpacity={0.5}
                                    underlayColor="#eee"
                                    style={styles.touchableButton}
                                >
                                    <View style={styles.button}>
                                        <View style={styles.textWrapper}>
                                            <Text style={styles.text}>{element.option}</Text>
                                            <Text style={styles.small}>{res}</Text>
                                        </View>

                                        <Icon
                                            name="angle-down"
                                            style={styles.icon}
                                            color="rgba(122,122,122,1)"
                                            size={20}
                                        />
                                    </View>
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                )}
                <ActionSheet
                    ref={o => (this.AutomobileSheet = o)}
                    title={automobileTitle}
                    options={automobileOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={i => this.handlePress(automobileOptions, i, 'automobile')}
                    styles={{
                        body: {
                            borderRadius: 30
                        },
                        titleBox: {
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30
                        }
                    }}
                />
                <ActionSheet
                    ref={o => (this.TypeSheet = o)}
                    title={typeTitle}
                    options={typeOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={i => this.handlePress(typeOptions, i, 'type')}
                />
            </View>
        );
    }
}

/* For Selecting Automobile */
const automobileTitle = 'Which Automobile do you prefer?';
const automobileOptions = ['Cancel', 'Car', 'Bus', 'Train'];

/* For Selecting Type of Vehicle */
const typeTitle = 'What is the fuel type of your automobile?';
const typeOptions = ['Cancel', 'Petrol', 'Diesel', 'CNG', 'Electric'];
const CANCEL_INDEX = 0;

/* For Inputing Mileage */
let values = [];
let units = ['km/litre', 'miles/gallon'];
for (var i = 0; i <= 40; i += 0.1) {
    values.push(i.toFixed(1));
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: newColors.secondary
    },
    main: {
        paddingTop: 20,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        flex: 1
    },
    touchableButton: {
        paddingVertical: 10,
        borderColor: 'rgba(215,215,215,0.3)',
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: color.black
    },
    small: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: color.lightBlack,
        letterSpacing: 1,
        paddingTop: 4
    },

    textWrapper: {
        marginLeft: 10
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
});
/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        storage: state.storage
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, StorageAction), dispatch);
}

Settings.propTypes = {
    setStorage: PropTypes.func.isRequired,
    storage: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
