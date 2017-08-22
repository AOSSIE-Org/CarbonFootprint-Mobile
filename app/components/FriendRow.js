import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, getIcon } from '../config/helper';

import images from '../config/images';

class FriendRow extends Component {
    render() {
        let { data, text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.info}>
                        {
                            data.picture?
                            <Image source={{uri: data.picture}} style={styles.image} />
                            :
                            <Image source={images.noImage} style={styles.image} />
                        }
                        <View style={styles.left}>
                            <Text style={styles.largeText}>{data.name}</Text>
                            <Text style={styles.smallText}>
                                { text }
                            </Text>
                        </View>
                        {
                            /*
                            data.iconName?
                                <View>
                                    <Icon name={getIcon(data.iconName)} size={30} color="black"/>
                                </View> 
                            :
                            <View></View>
                            */
                        }
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: color.borderGrey,
        shadowColor: color.shadowGrey,
        backgroundColor: color.white,
        width: Dimensions.get("window").width,
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        marginLeft: 8
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: color.grey,
    },
    largeText: {
        color: color.black,
        fontSize: 14,
    },
    smallText: {
        color: color.lightBlack,
        fontSize: 12,
        marginTop: 2,
    },
})

export default FriendRow;
