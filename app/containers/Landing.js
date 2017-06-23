import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import LandingButtons from '../components/LandingButtons';

class Landing extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ImageHeader text="Carbon Footprint" />
                <LandingButtons {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Landing;
