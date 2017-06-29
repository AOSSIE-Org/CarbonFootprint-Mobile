import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchHeader from '../components/SearchHeader';

class Search extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <SearchHeader {...this.props} />
            </View>
        )
    }
}

export default Search;
