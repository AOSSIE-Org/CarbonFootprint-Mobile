import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityTabBar = props => {
    return (
        <View style={[styles.tabs, props.style || {}]}>
            {props.tabsAlt.map((tab, index) => {
                let overrideStyles = index == props.activeTab ? styles.activeStyle : {};
                return (
                    <TouchableOpacity
                        key={tab.text}
                        onPress={() => props.goToPage(index)}
                        style={[styles.tab, overrideStyles]}
                    >
                        <Icon name={tab.icon} size={20} />
                        {index == props.activeTab && <Text style={styles.tabText}>{tab.text}</Text>}
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
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 30
    },
    tabText: {
        color: newColors.black,
        fontFamily: 'Poppins'
    },
    tabs: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    activeStyle: {
        backgroundColor: 'rgba(33,145,251,0.46)'
    }
});

export default React.memo(ActivityTabBar);
