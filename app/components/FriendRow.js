/*
 * To show friends list item
*/

import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import { color, getIcon } from '../config/helper';
import images from '../config/images';

/**
 * Component to Show Friends in Row
 * @param  props properties from parent class
 */
const FriendRow = props => {
    let { data, text } = props;
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.info}>
                    {data.picture ? (
                        <Image
                            source={{ uri: data.picture }}
                            style={styles.image}
                        />
                    ) : (
                        <Image source={images.noImage} style={styles.image} />
                    )}
                    <View style={styles.left}>
                        <Text style={styles.largeText}>{data.name}</Text>
                        <Text style={styles.smallText}>{text}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    {props.iconName ? (
                        <TouchableNativeFeedback onPress={props.link}>
                            <Icon
                                name={getIcon(props.iconName)}
                                size={30}
                                color="black"
                            />
                        </TouchableNativeFeedback>
                    ) : (
                        <View>
                            <Text>
                                {data.data
                                    ? data.data.total.footprint + ' kg'
                                    : '0 kg'}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        backgroundColor: color.white,
        width: Dimensions.get('window').width
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    left: {
        marginLeft: 8
    },
    right: {
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: color.grey
    },
    largeText: {
        color: color.black,
        fontSize: 14
    },
    smallText: {
        color: color.lightBlack,
        fontSize: 12,
        marginTop: 2
    }
});

FriendRow.propTypes = {
    data: PropTypes.any,
    iconName: PropTypes.string,
    text: PropTypes.string
};

export default FriendRow;
