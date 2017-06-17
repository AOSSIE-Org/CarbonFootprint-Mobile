import React, { Component } from 'react';
import {
    View,
    StyleSheet
 } from 'react-native';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';

 import * as SimpleAction from '../actions/SimpleAction';
 import * as FbLoginAction from '../actions/FbLoginAction';
 import * as GoogleLoginAction from '../actions/GoogleLoginAction';
 
 import SimpleButton from '../components/SimpleButton';
 import FbLogin from '../components/FbLogin';
 import GoogleLogin from '../components/GoogleLogin';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <GoogleLogin {...this.props} />
                <FbLogin {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    return bindActionCreators(Object.assign({}, SimpleAction, FbLoginAction, GoogleLoginAction), dispatch) ;
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
