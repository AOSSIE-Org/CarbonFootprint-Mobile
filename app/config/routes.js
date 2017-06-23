import React, { Component } from 'react';
import {
    Scene,
    Router
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import Master from '../containers/Master';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';

const RouterWithRedux = connect()(Router);

class Navigator extends Component {
    render() {
        return(
            <RouterWithRedux>
                <Scene key="root">
                    <Scene key="master" component={Master} initial hideNavBar/>
                    <Scene key="landing" hideNavBar>
                        <Scene key="home" component={Home} initial  />
                        <Scene key="login" component={Login} />
                        <Scene key="register" component={Register} />
                    </Scene>
                </Scene>
            </RouterWithRedux>
        )
    }
}

export default Navigator;
