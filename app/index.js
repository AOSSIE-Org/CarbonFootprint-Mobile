import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class CarbonFootprint extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>This is Shared Code for both Android and iOS</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CarbonFootprint;
