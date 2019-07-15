import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { newColors } from '../config/helper';

const ModTextInput = props => {
    let label = props.text ? props.text.toUpperCase() : props.stateKey.toUpperCase();
    return (
        <View style={[styles.input, props.style || {}]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={props.placeholder}
                value={props.value}
                style={styles.field}
                onChangeText={text => props.handleInput(props.stateKey, text)}
                placeholderTextColor="rgba(255,255,255,0.6)"
                underlineColorAndroid="transparent"
                returnKeyType={props.returnKeyType}
                keyboardType={props.keyboardType || 'default'}
                editable={props.editable ? false : true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'flex-start',
        color: 'white',
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 5
    },
    label: {
        color: 'white',
        fontFamily: 'Poppins-Regular'
    },
    field: {
        color: 'white',
        fontSize: 15,
        // marginLeft: 5,
        marginRight: -3,
        width: '90%',
        fontFamily: 'Poppins-Regular'
    }
});

export default ModTextInput;
