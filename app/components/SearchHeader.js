import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Text,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';

class SearchHeader extends Component {
    openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		console.log(place);
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
    render() {
        return (
            <View style={styles.container}>
                <Icon.Button name="ios-arrow-back" backgroundColor="#538124"
                    onPress={() => Actions.pop()} />
                <View style={styles.search}>
                    <View style={styles.box}>
                        <Icon name="ios-compass-outline" color="#eee" size={18} style={styles.icon}/>
                        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <Icon name="ios-pin-outline" color="#eee" size={18} style={styles.icon}/>
                        <Text>This is box</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: '#538124',
        paddingBottom: 5,
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
    },
    search: {
        alignItems: 'center',
        marginLeft: 20,
    },
    box: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingBottom: 5,
    },
    icon: {
        marginRight: 8,
    }
})

export default SearchHeader;
