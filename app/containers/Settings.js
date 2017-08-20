import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    Text
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Picker from 'react-native-picker';

import Header from '../components/Header';
import { color, getIcon } from '../config/helper';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            // This should come from RealmDB. Default should be Car.
            selected: "Car",
            value: 10.1,
            unit: 'km/litre',
        }
    }

    selectAutomobile() {
        this.AutomobileSheet.show();
    }


    handlePress(selected) {
        if (selected != 0) {
            this.setState({
                selected: options[selected]
            })
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
            },
        });
        Picker.show();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header icon={true} iconName="arrow-back" text="Settings" />
                <View style={styles.main}>
                    <TouchableHighlight onPress={() => this.selectAutomobile()}
                        activeOpacity={0.5} underlayColor="#eee">
                        <View style={styles.button}>
                            <Text style={styles.text}>Preferred Automobile</Text>
                            <Text style={styles.small}>
                                {this.state.selected}</Text>
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
                <ActionSheet
                    ref={o => this.AutomobileSheet = o}
                    title={automobileTitle}
                    options={automobileOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={(i) => this.handlePress(i)}
                />
            </View>
        )
    }
}

/* For Selecting Automobile */
const automobileTitle = "Which Automobile do you prefer?";
const automobileOptions = ["Cancel", "Car", "Bus", "Train"];
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
    }
})

export default Settings;
