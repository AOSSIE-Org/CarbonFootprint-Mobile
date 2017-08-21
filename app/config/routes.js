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
import Calculate from '../containers/Calculate';
import Main from '../containers/Main';
import TimelineTab from '../containers/TimelineTab';
import ActivityHistory from '../containers/ActivityHistory';
import More from '../containers/More';
import About from '../containers/About';
import Terms from '../containers/Terms';
import Stats from '../containers/Stats';
import Friends from '../containers/Friends';
import Settings from '../containers/Settings';

import Footer from '../components/Footer';

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
                        <Scene key="main" navBar={Footer}>
                            <Scene key="timeline" component={TimelineTab} />
                            <Scene key="calculate" component={Calculate} initial />
                            <Scene key="activity" component={Main} />
                            <Scene key="more" component={More} />
                            <Scene key="about" component={About} hideNavBar />
                            <Scene key="terms" component={Terms} hideNavBar />
                            <Scene key="settings" component={Settings} hideNavBar />
                            <Scene key="stats" component={Stats} />
                            <Scene key="friends" component={Friends} />
                            <Scene key="activityHistory" component={ActivityHistory}/>
                        </Scene>
                    </Scene>

                </Scene>
            </RouterWithRedux>
        )
    }
}

export default Navigator;
