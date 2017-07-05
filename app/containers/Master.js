import React, { Component, cloneElement } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as StorageAction from '../actions/StorageAction';

class Master extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getStorage();
        //console.log(this.props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        if (!props.storage.isFetching) {
            SplashScreen.hide();
            //console.log(props.storage)
            // Change this to props.storage.email to login to main page
            if (!props.storage.email) {
                Actions.landing();
            } else {
                Actions.mainPage();
            }
        }
    }

    /* Render is just a placeholder here
     * This basically handles only redirection.
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
    return bindActionCreators(Object.assign({}, StorageAction), dispatch);
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Master);
