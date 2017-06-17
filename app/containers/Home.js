import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
 } from 'react-native';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';
 import * as SimpleAction from '../actions/SimpleAction';

 import SimpleButton from '../components/SimpleButton';

class Home extends Component {
    render() {
        return(
            <View style={styles.container}>
                <SimpleButton {...this.props} />
            </View>
        )
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
    return bindActionCreators(Object.assign({}, SimpleAction), dispatch)
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
