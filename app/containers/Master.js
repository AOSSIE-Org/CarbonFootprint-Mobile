import React, { Component, cloneElement } from 'react';
import { View, StyleSheet, NetInfo, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import * as AuthAction from '../actions/AuthAction';

/**
 * Master Container
 * @extends Component
 */
class Master extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initApp();
    }

    componentWillReceiveProps(props) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
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
                    [{ text: 'OK' }],
                    { cancelable: true }
                );
            }
        });
    }

    /* Render is just a placeholder here
     * This container handles only redirection.
     */

    render() {
        return <View style={styles.container} />;
    }
}

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
});

/**
 *  Returning whole State for now. Should be segragated later as the need arises
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, AuthAction), dispatch);
}

Master.propTypes = {
    auth: PropTypes.object,
    initApp: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Master);
