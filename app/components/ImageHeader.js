import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import images from '../config/images';

/**
 * header With Image Component
 * @param  props properties From Parent Class
 */
const ImageHeader = props => {
    return (
        <View style={styles.container}>
            <Image source={images.logo} style={styles.image} />
            <Text style={styles.text} autoCapitalize="characters">
                {props.text}
            </Text>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 80,
        height: 80
    },
    text: {
        fontSize: 14,
        letterSpacing: 2
    }
});

ImageHeader.propTypes = {
    text: PropTypes.string
};

export default ImageHeader;
