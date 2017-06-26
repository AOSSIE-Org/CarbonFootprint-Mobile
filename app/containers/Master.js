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
import * as LocalStorage from '../actions/LocalStorage';

class Master extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getStorage();
    }

    componentDidMount() {
        if (!this.props.storage.isFetching) {
            SplashScreen.hide();
            if (this.props.storage.token.length === 0) {
                Actions.landing();
            } else {
                Actions.main();
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
    return bindActionCreators(Object.assign({}, StorageAction, LocalStorage), dispatch);
}

/*
 * This is needed to allow the components
 * to have access to Actions and store variables
 */
export default connect(mapStateToProps, mapDispatchToProps)(Master);
