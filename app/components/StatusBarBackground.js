'use strict';
import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { color } from '../config/helper';

function StatusBarBackground({ style }) {
    return (
        <View style={[styles.statusBarBackground, style || {}]} /> //This part is just so you can change the color of the status bar from the parents by passing it as a prop
    );
}

function isIPhoneXSize(dim) {
    return dim.height == 812 || dim.width == 812;
}

function isIPhoneXrSize(dim) {
    return dim.height == 896 || dim.width == 896;
}

export const returnHeightOfStatusBar = () => {
    let dim = Dimensions.get('window');
    if (Platform.OS === 'ios') {
        if (isIPhoneXSize(dim) || isIPhoneXrSize(dim)) return 30;
        else return 18;
    }
    return 0;
};

const styles = StyleSheet.create({
    statusBarBackground: {
        height: returnHeightOfStatusBar(), //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: color.darkPrimary
    }
});

export default StatusBarBackground;
