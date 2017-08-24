import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    Text,
    ActivityIndicator
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Picker from 'react-native-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as StorageAction from '../actions/StorageAction';
import Header from '../components/Header';
import { color, getIcon } from '../config/helper';

class Settings extends Component {
    constructor(props) {
        super(props);
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");
        console.log(this.props);
        let data = this.props.storage.data;
        this.state = {
            ...data
        }
    }

    handlePress(array, value, key) {
        if (value != 0) {
            let data = this.state;
            data[key] = array[value];
            this.setState({
                ...data
            })
            this.props.setStorage(data);
        }
    }

    showPicker() {
        Picker.init({
            pickerData: [values, units],
            selectedValue: [this.state.value, this.state.unit],
            pickerConfirmBtnText: "Select",
            pickerCancelBtnText: "Cancel",
            pickerTitleText: "Mileage",
            onPickerConfirm: data => {
                this.setState({
                    value: data[0],
                    unit: data[1],
                })
                this.props.setStorage({
                    ...this.state,
                    value: data[0],
                    unit: data[1]
                });
            },
        });
        Picker.show();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header icon={true} iconName="arrow-back" text="Settings" />
                {
                    this.props.storage.isFetching ?
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={color.primary}/>
                    </View>
                    :
                    <View style={styles.main}>
                        <TouchableHighlight onPress={() => this.AutomobileSheet.show()}
                            activeOpacity={0.5} underlayColor="#eee">
                            <View style={styles.button}>
                                <Text style={styles.text}>Preferred Automobile</Text>
                                <Text style={styles.small}>
                                    {this.state.automobile}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.TypeSheet.show()}
                            activeOpacity={0.5} underlayColor="#eee">
                            <View style={styles.button}>
                                <Text style={styles.text}>Fuel Type</Text>
                                <Text style={styles.small}>
                                    {this.state.type}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.showPicker()}
                            activeOpacity={0.5} underlayColor="#eee">
                            <View style={styles.button}>
                                <Text style={styles.text}>Approximate Mileage</Text>
                                <Text style={styles.small}>
                                    {
                                        this.state.value + ' ' + this.state.unit
                                    }
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }

                <ActionSheet
                    ref={o => this.AutomobileSheet = o}
                    title={automobileTitle}
                    options={automobileOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={(i) => this.handlePress(automobileOptions, i, "automobile")}
                />
                <ActionSheet
                    ref={o => this.TypeSheet = o}
                    title={typeTitle}
                    options={typeOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={(i) => this.handlePress(typeOptions, i, "type")}
                />
            </View>
        )
    }
}

/* For Selecting Automobile */
const automobileTitle = "Which Automobile do you prefer?";
const automobileOptions = ["Cancel", "Car", "Bus", "Train"];

/* For Selecting Type of Vehicle */
const typeTitle = "What is the fuel type of your automobile?";
const typeOptions = ["Cancel", "Petrol", "Diesel", "CNG", "Electric"];
const CANCEL_INDEX = 0;

/* For Inputing Mileage */
let values = [];
let units = ["km/litre", "miles/gallon"];
for (var i=0; i<=40; i+= 0.1) {
    values.push(i.toFixed(1));
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.greyBack,
    },
    main: {
        marginTop: 75,
        width: Dimensions.get("window").width,
    },
    button: {
        paddingLeft: 13,
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        height: 50,
        width: Dimensions.get("window").width,
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: color.black,
        letterSpacing: 1,
    },
    small: {
        fontSize: 12,
        color: color.lightBlack,
        letterSpacing: 1,
        paddingTop: 4,
    },
    center: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
})

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, StorageAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Settings);
