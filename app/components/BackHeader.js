import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { newColors } from '../config/helper';
import images from '../config/images';

/**
 * backbutton in header
 * @param  props properties send from parent class
 */
const BackHeader = props => {
    return (
        <View style={styles.container}>
            <Icon.Button
                // name={getIcon('arrow-back')}
                name="long-arrow-left"
                iconStyle={styles.icon}
                backgroundColor="white"
                size={30}
                color={newColors.black}
                onPress={() => Actions.pop()}
            />
            {props.icon ? <Image source={images.login_logo} style={styles.logo} /> : null}
            {props.text ? (
                <Icon.Button
                    name={props.toIcon}
                    onPress={props.link}
                    color="white"
                    style={styles.button}
                    borderRadius={30}
                    backgroundColor={newColors.lightPrimary}
                >
                    <Text style={styles.buttonText}>{props.text}</Text>
                </Icon.Button>
            ) : null}
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Muli-Regular',
        paddingLeft: 5,
        paddingRight: 5
    },
    logo: {
        width: 40,
        height: 40
    }
});

export default React.memo(BackHeader);
