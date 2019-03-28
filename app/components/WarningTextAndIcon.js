import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon, color } from '../config/helper';

const WarningTextAndIcon = props => {
    const { iconName, text } = props;

    return (
        <View style={styles.centerScreen}>
            <Icon name={getIcon(iconName)} size={56} color={color.lightPrimary} />
            <Text style={styles.warningText}>{text}</Text>
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    warningText: {
        fontSize: 18,
        color: color.darkPrimary,
        marginTop: 10
    },
    centerScreen: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
});

export default WarningTextAndIcon;
