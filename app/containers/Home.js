import React, { Component, cloneElement } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar
 } from 'react-native';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';

 import * as FbLoginAction from '../actions/FbLoginAction';
 import * as GoogleLoginAction from '../actions/GoogleLoginAction';

 import * as TwitterLoginAction from '../actions/TwitterLoginAction';

 import ImageHeader from '../components/ImageHeader';
 import LandingButtons from '../components/LandingButtons';

 import * as firebase from 'firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBAHGSAugperKUBiIxNeNCVJ7AyoXt7uTM",
            authDomain: "carbon-footprint-19ed4.firebaseapp.com",
            databaseURL: "https://carbon-footprint-19ed4.firebaseio.com",
            projectId: "carbon-footprint-19ed4",
            storageBucket: "carbon-footprint-19ed4.appspot.com",
            messagingSenderId: "755065860133"
        };
        firebase.initializeApp(config);
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageHeader text="Carbon Footprint" />
                <LandingButtons {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({},
        FbLoginAction,
        GoogleLoginAction,
        TwitterLoginAction
    ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
