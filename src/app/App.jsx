"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {VerticalLayout, Login, Register, CookieUtils} from '../common';
import 'antd/dist/antd.css';

import Portal from './modules/portal/portal';
import Community from './modules/community/community';
import Console from './modules/console/console';

import {footer, LocationHash, headerMenu, login, logout, getUserInfo} from './common/AppCommon';

const Main = (props) => {
    console.log('Main render');
    return (
        <VerticalLayout menu={headerMenu} user={props.user} logout={props.logout} footer={footer}>
            <Route exact={true} path={LocationHash.index}
                   component={() => <Redirect to={LocationHash.portal}/>}/>
            <Route path={LocationHash.portal} component={Portal}/>
            <Route path={LocationHash.community} component={() => <Community user={props.user}/>}/>
            <Route path={LocationHash.console} component={() => <Console user={props.user}/>}/>
        </VerticalLayout>
    );
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };

        this.login = this.login.bind(this);
        if (CookieUtils.get('token')) {
            getUserInfo(((user) => {
                this.setState({
                    user: user
                });
            }).bind(this));
        }
    }

    login(values) {
        login(values, ((user) => {
            CookieUtils.set('token', user.token);
            this.setState({
                user: user
            });
            location.hash = LocationHash.index;
        }).bind(this));
    }

    logout() {
        logout();
        CookieUtils.del('token');
        this.setState({
            user: null
        });
        location.hash = LocationHash.index;
    }

    render() {
        console.log('App render');
        return (
            <HashRouter>
                <div>
                    <Route exact={true} path="/" component={() => <Redirect to={LocationHash.index}/>}/>
                    <Route path={LocationHash.login} component={() => <Login login={this.login}/>}/>
                    <Route path={LocationHash.register} component={Register}/>
                    <Route path={LocationHash.index}
                           component={() => <Main user={this.state.user} logout={this.logout.bind(this)}/>}/>
                </div>
            </HashRouter>
        );
    }
}