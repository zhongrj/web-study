"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {VerticalLayout, Login, Register, CookieUtils} from '../common';
import 'antd/dist/antd.css';

import Portal from './modules/portal/portal';
import Community from './modules/community/community';
import Console from './modules/console/console';

import {footer, LocationHash, headerMenu, Service} from './common/AppCommon';


const Main = ({user, logout}) => {
    return (
        <VerticalLayout menu={headerMenu} user={user} logout={logout} footer={footer}>
            <Route exact={true} path={LocationHash.index}
                   component={() => <Redirect to={LocationHash.portal}/>}/>
            <Route path={LocationHash.portal} component={() => <Portal/>}/>
            <Route path={LocationHash.community} component={() => <Community user={user}/>}/>
            <Route path={LocationHash.console} component={() => <Console user={user}/>}/>
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
                    <Route path={LocationHash.login} component={() => <Login login={this.login}/>}/>
                    <Route path={LocationHash.register} component={() => <Register/>}/>
                    <Route path={LocationHash.index} component={() => <Main user={user} logout={this.logout.bind(this)}/>}/>
                </div>
            </HashRouter>
        );
    }
}
