import React, { Component, cloneElement } from 'react';
import {
    View,
    StyleSheet,
    NetInfo,
    Alert
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as AuthAction from '../actions/AuthAction';

class Master extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    componentWillMount() {
                this.props.initApp();
    }

    componentWillReceiveProps(props) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                if (!props.auth.isFetching) {
                    SplashScreen.hide();
                    if (!props.auth.user) {
                        Actions.landing();
                    } else {
                        Actions.main();
                    }
                }
            } else {
                Alert.alert( 
                            'Enable Internet', 
                            'Internet is not connected. Please connect to Internet.', 
                            [  
                                { text: 'OK' }, 
                            ],
                            { cancelable: true } 
                        );
            }
        })
    }

    /* Render is just a placeholder here
     * This container handles only redirection.
     */

    render() {
        return(
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    }
})

function mapStateToProps(state) {
    /*
     * Returning whole State for now.
     * Should be segragated later as the need arises.
     */
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Master);
