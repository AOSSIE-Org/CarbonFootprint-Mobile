import React, { Component } from 'react';
import {
    View,
    StyleSheet
 } from 'react-native';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';

 import * as SimpleAction from '../actions/SimpleAction';
 import * as SocialLoginAction from '../actions/SocialLoginAction';
 
 import SimpleButton from '../components/SimpleButton';
 import SocialLogin from '../components/SocialLogin';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <SocialLogin {...this.props} id = "1"/>
                <SocialLogin {...this.props} id = "2"/>
                <SocialLogin {...this.props} id = "3"/>
                <SocialLogin {...this.props} id = "4"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        margin: 20
    }
});

function mapStateToProps(state) {
    /*
     * Returning whole State for now.
     * Should be segragated later as the need arises.
     */
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, SimpleAction, SocialLoginAction), dispatch) ;
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
