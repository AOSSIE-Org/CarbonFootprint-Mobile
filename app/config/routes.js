import React, { Component } from 'react';
import {
    Scene,
    Router,
    Modal
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import Master from '../containers/Master';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Main from '../containers/Main';
import ActivityHistory from '../containers/ActivityHistory';

const RouterWithRedux = connect()(Router);

class Navigator extends Component {
    render() {
        return(
            <RouterWithRedux>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="master" component={Master} initial hideNavBar/>
                        <Scene key="landing" hideNavBar>
                            <Scene key="home" component={Home} initial  />
                            <Scene key="login" component={Login} />
                            <Scene key="register" component={Register} />
                        </Scene>
                        <Scene key="main" hideNavBar>
                            <Scene key="activity" hideNavBar>
                                <Scene key="activityMain" component={Main} initial/>
                                <Scene key="activityHistory" component={ActivityHistory}/>
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </RouterWithRedux>
        )
    }
}

export default Navigator;
