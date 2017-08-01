import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import Footer from '../components/Footer';
import Header from '../components/Header';

class More extends Component {
    getIcon(name) {
        return (Platform.OS === "android" ?
            "md-": "ios-") + name
    }

    render() {
        let groups = [
            [
                {
                    icon: "settings",
                    text: "Settings",
                    link: () => console.log("Settings"),
                },
                {
                    icon: "stats",
                    text: "Stats",
                    link: () => console.log("Stats"),
                }
            ],
            [
                {
                    icon: "information-circle",
                    text: "About Us",
                    link: () => Actions.moreAbout(),
                },
                {
                    icon: "clipboard",
                    text: "Terms and Conditions",
                    link: () => Actions.moreTerms(),
                }
            ],
            [
                {
                    icon: "log-out",
                    text: "Logout",
                    link: () => console.log("Logout"),
                }
            ]
        ];
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header icon={false} text="More" />
                <View style={styles.main}>
                    {
                        groups.map((group, index) => {
                            return (
                                <View style={styles.group} key={index}>
                                    {
                                        group.map((item, i) => {
                                            return (
                                                <TouchableHighlight onPress={item.link}
                                                    activeOpacity={0.5} underlayColor="#eee" key={i}>
                                                    <View style={styles.button}>
                                                        <Icon name={this.getIcon(item.icon)}
                                                            size={24} style={styles.icon} color="#444"/>
                                                        <Text style={styles.text}>{item.text}</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
                <Footer name="more" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: "#f7f7f7",
    },
    main: {
        marginTop: 10,
        width: Dimensions.get("window").width,
    },
    group: {
        marginTop: 20,
        width: Dimensions.get("window").width,
    },
    button: {
        flexDirection: 'row',
        paddingLeft: 13,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#ddd',
        height: 50,
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontSize: 14,
        color: "#444",
        letterSpacing: 1,
    }
})

export default More;
