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

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Home");
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
