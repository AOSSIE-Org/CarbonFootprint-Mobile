import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import images from '../config/images';

class About extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Header icon={true} iconName="arrow-back" text="About" />
                <View style={styles.main}>
                    <Image source={images.logo} style={styles.image} />
                    <Text style={styles.large}> Carbon Footprint</Text>
                    <View style={styles.text}>
                        <Text style={styles.small}>
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                            This is the about section.
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
        marginTop: 20,
        padding: 13,
    },
    image: {
        width: 80,
        height: 80,
    },
    large: {
        letterSpacing: 1,
        fontSize: 16,
        marginTop: 10,
    },
    small: {
        fontSize: 13,
        letterSpacing: 1,
    },
    text: {
        padding: 13,
        marginTop: 10,
    }
})

export default About;
