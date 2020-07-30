import React, { useState, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import BackHeader from '../components/BackHeader';
import { useDispatch } from 'react-redux';
import { newColors } from '../config/helper';
import { mapboxKey } from '../config/keys';
import Icon from 'react-native-vector-icons/FontAwesome';
import { debounce } from 'lodash';
import WarningTextAndIcon from '../components/WarningTextAndIcon';
import { getRegion, set_destination, set_region, set_source } from '../actions/DirectionAction';
import { Actions, ActionConst } from 'react-native-router-flux';

const PlaceSearch = props => {
    const [data, setData] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState(false);
    const [placeFetch, setPlaceFetch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const search = useCallback(debounce(value => searchPlace(value), 1500), []);

    const handleChange = value => {
        setData(value);
        search(value);
    };

    const searchPlace = value => {
        setPlaceFetch(true);
        console.log(value);
        fetch(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                value +
                '.json?access_token=' +
                mapboxKey
        )
            .then(res => res.json())
            .then(json => {
                setError(false);
                setResult(json.features);
            })
            .catch(err => {
                setError(true);
                setErrorMessage('There was a problem retrieving data from mapbox');
                setResult([]);
                console.log(err);
            });
    };

    const onSelected = item => {
        console.log(item);
        let coordinates = {};
        coordinates.latitude = item.geometry.coordinates[1];
        coordinates.longitude = item.geometry.coordinates[0];
        // For destination
        if (props.value) {
            dispatch(set_destination(coordinates, item.place_name));
        } else {
            getRegion(
                {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                },
                null
            ).then(result => {
                dispatch(set_region(result));
                dispatch(set_source(coordinates, item.place_name));
            });
        }
        Actions.calculate({ type: ActionConst.REPLACE });
    };

    const handleClear = () => {
        setPlaceFetch(false);
        setData('');
        setResult([]);
    };

    const renderFlatlist = item => {
        return (
            <TouchableWithoutFeedback onPress={() => onSelected(item)}>
                <View style={styles.itemStyle}>
                    <Text style={styles.textStyle}>{item.place_name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const renderList = () => {
        if (result && placeFetch) {
            if (result.length) {
                return (
                    <FlatList
                        contentContainerStyle={styles.flatlist}
                        data={result}
                        renderItem={({ item }) => renderFlatlist(item)}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                );
            } else {
                return (
                    <View style={styles.warningWrapper}>
                        <WarningTextAndIcon iconName="sad" text="No Place Found." />
                    </View>
                );
            }
        }
    };

    return (
        <View style={styles.view}>
            <BackHeader text="Search Place" />
            <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <Icon name="search" size={16} style={styles.searchIcon} />
                        <TextInput
                            value={data}
                            onChangeText={value => handleChange(value)}
                            placeholder="Enter place name"
                            style={styles.inputBox}
                            autoCapitalize="none"
                        />
                        <Icon
                            name="times-circle"
                            size={16}
                            style={styles.clearIcon}
                            onPress={handleClear}
                        />
                    </View>
                </View>
            </View>
            {renderList()}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    flatlist: {
        paddingTop: 5,
        paddingRight: 10,
        paddingLeft: 10
    },
    itemStyle: {
        paddingTop: 8,
        paddingBottom: 8
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'black'
    },
    searchWrapper: {
        backgroundColor: newColors.lightPrimary,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        height: 60,
        margin: 5,
        borderRadius: 10
    },
    warningWrapper: {
        position: 'relative',
        flex: 1
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    inputBox: {
        flex: 1,
        alignItems: 'center'
    },
    searchIcon: {
        marginHorizontal: 5
    },
    clearIcon: {
        marginHorizontal: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: newColors.lightPrimary,
        width: Dimensions.get('window').width * 0.9
    }
});

export default PlaceSearch;
