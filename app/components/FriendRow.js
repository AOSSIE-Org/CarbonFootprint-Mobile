/*
 * To show friends list item
 */

import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color, getIcon } from '../config/helper';
import images from '../config/images';

/**
 * Component to Show Friends in Row
 * @param  props properties from parent class
 */
const FriendRow = props => {
    let { data, text } = props;
    return (
        <View style={styles.friendsRowWrapper}>
            <View style={styles.friendsrowLeft}>
                <Image source={images.logo} style={styles.avatar} />
                <View style={styles.textWrapper}>
                    <Text style={styles.nameText}>{data.name}</Text>
                    <Text style={styles.emailText}>
                        {text} {data.data ? ' kg' : null}
                    </Text>
                </View>
            </View>
            <View style={styles.iconsWrapper}>
                {props.iconName ? (
                    <Icon
                        name="minus-circle"
                        size={24}
                        onPress={props.link}
                        color="black"
                        backgroundColor="white"
                    />
                ) : null}
                {props.iconName && props.iconName.length === 2 ? (
                    <Icon
                        name="check-circle"
                        size={24}
                        style={{
                            paddingLeft: 16
                        }}
                        onPress={props.reject}
                    />
                ) : null}
            </View>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    textWrapper: {
        marginLeft: 15
    },
    nameText: {
        fontFamily: 'Poppins',
        fontSize: 16
    },
    emailText: {
        color: '#646464',
        fontSize: 12
    },
    friendsRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        // backgroundColor: 'red',
        width: Dimensions.get('window').width * 0.9
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
    friendsrowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconsWrapper: {
        flexDirection: 'row'
    }
});

FriendRow.propTypes = {
    data: PropTypes.any,
    iconName: PropTypes.array,
    text: PropTypes.string
};

export default FriendRow;
