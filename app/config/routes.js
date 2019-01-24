import React from 'react';
import { Scene, Router, Modal, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Intro from '../containers/Intro';
import Master from '../containers/Master';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Calculate from '../containers/Calculate';
import Activity from '../containers/Activity';
import TimelineTab from '../containers/TimelineTab';
import More from '../containers/More';
import About from '../containers/About';
import Terms from '../containers/Terms';
import Dashboard from '../containers/Dashboard';
import Friends from '../containers/Friends';
import Settings from '../containers/Settings';
import Forgot from '../containers/Forgot';
import UserProfile from '../containers/Profile';

import Footer from '../components/Footer';

const RouterWithRedux = connect()(Router);

/**
 * navigator using react-native-router-flux
 */
const Navigator = () => (
    <RouterWithRedux>
        <Scene key="modal" component={Modal} panHandlers={null}>
            <Scene key="root" panHandlers={null}>
                <Scene
                    key="intro"
                    component={Intro}
                    panHandlers={null}
                    hideNavBar
                    initial
                />
                <Scene
                    key="master"
                    component={Master}
                    panHandlers={null}
                    hideNavBar
                />
                <Scene key="landing" hideNavBar>
                    <Scene
                        key="home"
                        component={Home}
                        panHandlers={null}
                        initial
                    />
                    <Scene
                        key="login"
                        component={Login}
                        panHandlers={null}
                    />
                    <Scene
                        key="register"
                        component={Register}
                        panHandlers={null}
                    />
                    <Scene
                        key="forgot"
                        component={Forgot}
                        panHandlers={null}
                    />
                </Scene>
                <Scene key="main" navBar={Footer} panHandlers={null}>
                    <Scene
                        key="timeline"
                        component={TimelineTab}
                        panHandlers={null}
                    />
                    <Scene
                        key="calculate"
                        component={Calculate}
                        panHandlers={null}
                        initial
                    />
                    <Scene
                        key="activity"
                        component={Activity}
                        panHandlers={null}
                    />
                    <Scene
                        key="more"
                        component={More}
                        panHandlers={null}
                    />
                    <Scene
                        key="about"
                        component={About}
                        panHandlers={null}
                        hideNavBar
                    />
                    <Scene
                        key="terms"
                        component={Terms}
                        panHandlers={null}
                        hideNavBar
                    />
                    <Scene
                        key="settings"
                        component={Settings}
                        panHandlers={null}
                        hideNavBar
                    />
                    <Scene
                        key="profile"
                        component={UserProfile}
                        panHandlers={null}
                    />
                    <Scene
                        key="dashboard"
                        component={Dashboard}
                        panHandlers={null}
                    />
                    <Scene
                        key="friends"
                        component={Friends}
                        panHandlers={null}
                    />
                </Scene>
            </Scene>
        </Scene>
    </RouterWithRedux>
)

export default Navigator;
