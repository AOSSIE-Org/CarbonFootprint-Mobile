import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    Text,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Picker from 'react-native-picker';
import StatusBarBackground from '../components/StatusBarBackground';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import ProfileHeader from '../components/ProfileHeader';
import { color, newColors } from '../config/helper';
import { setStorage } from '../config/actionDispatcher';

const Settings = props => {
    const storage = useSelector(state => state.storage);
    const [data, setData] = useState(storage.data);
    const [isPickerOn, setIsPickerOn] = useState(false);
    const dispatch = useDispatch();
    const AutomobileSheet = useRef();
    const TypeSheet = useRef();
    const MapSheet = useRef();
    const keyValue = {
        automobile: 'automobile',
        type: 'type',
        map: 'map'
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => backPress());
        return () => BackHandler.removeEventListener('hardwareBackPress', () => backPress());
    }, []);

    useEffect(() => {
        dispatch(setStorage(data));
    }, [data]);

    const handlePress = (array, value, key) => {
        if (value != 0) {
            if (key === keyValue.automobile) {
                setData({
                    ...data,
                    automobile: array[value]
                });
            } else if (key === keyValue.type) {
                setData({
                    ...data,
                    type: array[value]
                });
            } else if (key === keyValue.map) {
                setData({
                    ...data,
                    map: array[value]
                });
            }
        }
    };

    const backPress = useCallback(() => {
        if (isPickerOn) {
            Picker.hide();
            setIsPickerOn(false);
        } else {
            Actions.pop();
        }
        return true;
    }, [isPickerOn]);

    const showPicker = () => {
        Picker.init({
            pickerData: [values, units],
            selectedValue: [data.value, data.unit],
            pickerConfirmBtnText: 'Select',
            pickerCancelBtnText: 'Cancel',
            pickerTitleText: 'Mileage',
            onPickerConfirm: newData => {
                setData({
                    ...data,
                    value: newData[0],
                    unit: newData[1]
                });
                dispatch(
                    setStorage({
                        ...data,
                        value: newData[0],
                        unit: newData[1]
                    })
                );
            }
        });
        Picker.show();
        setIsPickerOn(true);
    };

    const reduceState = arr => {
        return arr.reduce((total, el) => {
            return total + ' ' + data[el];
        }, '');
    };

    const style = {
        backgroundColor: newColors.secondary
    };
    let list = [
        {
            option: 'Preferred Automobile',
            state: 'automobile',
            onPress: () => AutomobileSheet.current.show()
        },
        {
            option: 'Fuel Type',
            state: 'type',
            onPress: () => TypeSheet.current.show()
        },
        {
            option: 'Approximate Mileage',
            state: ['value', 'unit'],
            onPress: () => showPicker()
        },
        {
            option: 'Map Type',
            state: 'map',
            onPress: () => MapSheet.current.show()
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBarBackground style={style} />
            <ProfileHeader iconName="long-arrow-left" text="Settings" />
            {storage.isFetching ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={color.primary} />
                </View>
            ) : (
                <View style={styles.main}>
                    {list.map((element, i) => {
                        let res = Array.isArray(element.state)
                            ? reduceState(element.state)
                            : data[element.state];
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
                ref={AutomobileSheet}
                title={automobileTitle}
                options={automobileOptions}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={i => handlePress(automobileOptions, i, 'automobile')}
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
                ref={TypeSheet}
                title={typeTitle}
                options={typeOptions}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={i => handlePress(typeOptions, i, 'type')}
            />
            <ActionSheet
                ref={MapSheet}
                title={mapTitle}
                options={mapOptions}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={i => handlePress(mapOptions, i, 'map')}
            />
        </View>
    );
};

/* For Selecting Automobile */
const automobileTitle = 'Which Automobile do you prefer?';
const automobileOptions = ['Cancel', 'Car', 'Bus', 'Train'];

/* For Selecting Type of Vehicle */
const typeTitle = 'What is the fuel type of your automobile?';
const typeOptions = ['Cancel', 'Petrol', 'Diesel', 'CNG', 'Electric'];
const CANCEL_INDEX = 0;

const mapTitle = 'What type of Map do you prefer?';
const mapOptions = [
    'Cancel',
    'Dark',
    'Light',
    'Outdoors',
    'Satellite',
    'SatelliteStreet',
    'Street'
];

/* For Inputing Mileage */
let values = [];
let units = ['km/litre', 'miles/gallon'];
for (let i = 0; i <= 40; i += 0.1) {
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

export default Settings;
