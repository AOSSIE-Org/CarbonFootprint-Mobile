import React from 'react';
import { View, StyleSheet, Dimensions, Text, Platform, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getIcon, color, newColors } from '../config/helper';
import StatusBarBackground from './StatusBarBackground';

/**
 * Header Component
 * @param  props properties from Parent Class
 */
const ProfileHeader = props => {
    let topContainerStyle = [styles.container];
    return (
        <View style={topContainerStyle}>
            {props.iconName && (
                <Icon.Button
                    name={props.iconName}
                    color="black"
                    backgroundColor="rgba(0,0,0,0)"
                    iconStyle={styles.icon}
                    onPress={() => Actions.pop()}
                    size={22}
                />
            )}
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
    //     );
    // } else {
    //     return (
    //         <View style={topContainerStyle}>
    //             <Text style={styles.text}>{props.text}</Text>
    //         </View>
    //     );
    // }
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        backgroundColor: newColors.secondary,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20
    },
    text: {
        fontSize: 20,
        color: newColors.black,
        textAlign: 'center',
        marginRight: 10,
        fontFamily: 'Poppins-ExtraBold'
    }
});

ProfileHeader.propTypes = {
    text: PropTypes.string,
    iconName: PropTypes.string
};

export default ProfileHeader;
