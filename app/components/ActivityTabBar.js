import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ActivityTabBar extends React.Component {
    render() {
        return (
            <View style={[styles.tabs, this.props.style || {}]}>
                {this.props.tabsAlt.map((tab, i) => {
                    var overrideStyles = i == this.props.activeTab ? styles.activeStyle : {};
                    return (
                        <TouchableOpacity
                            key={tab.text}
                            onPress={() => this.props.goToPage(i)}
                            style={[styles.tab, overrideStyles]}
                        >
                            <Icon name={tab.icon} size={20} />
                            {i == this.props.activeTab && (
                                <Text style={styles.tabText}>{tab.text}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

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

export default ActivityTabBar;
