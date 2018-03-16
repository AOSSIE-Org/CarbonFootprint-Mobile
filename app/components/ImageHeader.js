import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import images from '../config/images';

const ImageHeader = props => {
    return(
        <View style={styles.container}>
            <Image source={images.logo} style={styles.image} />
            <Text style={styles.text} autoCapitalize="characters">{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 14,
        letterSpacing: 2
    }
})

export default ImageHeader;
