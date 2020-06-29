import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { newColors } from '../config/helper';

const FriendsTabBar = props => {
    return (
        <View style={[styles.tabs, this.props.style || {}]}>
            {props.tabs.map((tab, index) => {
                let overrideStyles = index == props.activeTab ? styles.activeStyle : {};
                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => props.goToPage(index)}
                        style={[styles.tab, overrideStyles]}
                    >
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 3
    },
    tabText: {
        color: newColors.black,
        fontFamily: 'Poppins'
    },
    tabs: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: newColors.secondary
    },
    activeStyle: {
        backgroundColor: 'rgba(0,0,0,0.12)'
    }
});

export default FriendsTabBar;
