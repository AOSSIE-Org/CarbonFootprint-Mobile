import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    StatusBar,
    TouchableHighlight,
    Alert, 
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import images from '../config/images';

class About extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Header icon={true} iconName="arrow-back" text="About Us" />
                <View style={styles.main}>
                    <Image source={images.logo} style={styles.image} />
                    <Text style={styles.large}> Carbon Footprint</Text>
                    <View style={styles.text}>
                        <View style={styles.small}>
                            <Text>
                                Carbon Footprint is an open-source project developed by
                            </Text>
                            <Text style={styles.blueText}
                                  onPress={() => Linking.openURL('http://aossie.org')}>
                              AOSSIE
                            </Text>
                            <Text>
                            (the Australian Open Source Software Innovation and Education association). 
                             This mobile application calculates amount of emitted co2 based on user's activity and traveled distance. 
                             Method used to calculate co2 emission is given 
                             </Text>
                             <TouchableHighlight onPress={this.calcMethod}>
                                 <Text style={styles.blueText}>
                                    here
                                 </Text>    
                            </TouchableHighlight>
                            <Text>
                            . Feedbacks and contributions are welcome in our 
                            </Text>
                            <Text style={styles.blueText} 
                                onPress={() => Linking.openURL('https://gitlab.com/aossie/CarbonFootprint-Mobile')}>
                              GitLab repository
                            </Text>
                            <Text>
                            . Report bugs and request features in our 
                            </Text>
                            <Text style={styles.blueText}
                                  onPress={() => Linking.openURL('https://gitlab.com/aossie/CarbonFootprint-Mobile/issues')}>
                              issue tracker.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    calcMethod() {
        Alert.alert(
            'co2 calculation method',
            'Present formula for calculating co2 emission is: emitted co2 (in kg) = co2 emission rate of fuel (in kg/L) * (traveled distance (in km) / mileage of vehicle (in km/L)). If activity is IN_VEHICLE, co2 calculated by above formula becomes Emitted co2 and Saved co2 is 0. If activity is WALKING, ON_BICYCLE etc., co2 calculated by above formula becomes Saved co2 and Emitted co2 is 0.',
            [
                {
                    text: 'OK'
                },
            ],
            { cancelable: true }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
        marginTop: 65, // (45 + 20)
        padding: 13,
    },
    image: {
        width: 80,
        height: 80,
    },
    large: {
        letterSpacing: 2,
        fontSize: 14,
        marginTop: 10,
    },
    small: {
        fontSize: 13,
        color: '#555',
        padding: 13,
    },
    text: {
        marginTop: 10,
    },
    blueText: {
        color: 'blue'
    }
})

export default About;
