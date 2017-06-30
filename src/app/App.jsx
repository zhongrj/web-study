"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {VerticalLayout, Login, Register, MyRoute, CookieUtils} from '../common';
import 'antd/dist/antd.css';

import Portal from './modules/portal/Portal';
import Community from './modules/community/Community';
import Console from './modules/console/Console';
import User from './modules/user/User';

import {footer, LocationHash, headerMenu, Service} from './common/AppCommon';


const Main = ({user, logout}) => {
    return (
        <VerticalLayout menu={headerMenu} user={user} logout={logout} footer={footer}>
            <Route exact={true} path={LocationHash.index}
                   component={() => <Redirect to={LocationHash.portal}/>}/>
            <MyRoute path={LocationHash.portal} component={Portal}/>
            <MyRoute path={LocationHash.community} component={Community} user={user}/>
            <MyRoute path={LocationHash.console} component={Console} user={user}/>
            <MyRoute path={LocationHash.user} component={User} user={user}/>
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
        this.logout = this.logout.bind(this);
        if (CookieUtils.get('token')) {
            Service.getUserInfo(((data) => {
                this.setState({
                    user: data.content
                });
            }).bind(this));
        }
    }

    login(values) {
        Service.login(values, ((data) => {
            let user = data.content;
            CookieUtils.set('token', user.token);
            this.setState({
                user: user
            });
            location.hash = LocationHash.index;
        }).bind(this));
    }

    logout() {
        Service.logout();
        CookieUtils.del('token');
        this.setState({
            user: null
        });
        location.hash = LocationHash.index;
    }

    render() {
        let {user} = this.state;
        return (
            <HashRouter>
                <div>
                    <Route exact={true} path="/" component={() => <Redirect to={LocationHash.index}/>}/>
                    <MyRoute path={LocationHash.login} component={Login} login={this.login}/>
                    <MyRoute path={LocationHash.register} component={Register}/>
                    <MyRoute path={LocationHash.index} component={Main} user={user} logout={this.logout}/>
                </div>
            </HashRouter>
        );
    }
}
