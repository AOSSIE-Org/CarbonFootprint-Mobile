import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { newColors } from '../config/helper';

/**
 * header With Image Component
 * @param  props properties From Parent Class
 */
const ImageHeader = props => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/login_logo.png')} style={styles.image} />
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
        width: 40,
        height: 40
    },
    text: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: newColors.primary
    }
});

ImageHeader.propTypes = {
    text: PropTypes.string
};

export default ImageHeader;
