"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {VerticalLayout, Login, Register, CookieUtils} from '../common';
import 'antd/dist/antd.css';

import Portal from './modules/portal/portal';
import Community from './modules/community/community';
import Console from './modules/console/console';

import {footer, LocationHash, headerMenu, Session} from './common/AppCommon';

const Main = () => (
    <VerticalLayout menu={headerMenu} footer={footer} user={Session.user}>
        <HashRouter>
            <div>
                {/*<Route exact={true} path="/">*/}
                {/*<Redirect to="/portal"/>*/}
                {/*</Route>*/}
                <Route path={LocationHash.portal} component={Portal}/>
                <Route path={LocationHash.community} component={Community}/>
                <Route path={LocationHash.console} component={Console}/>
            </div>
        </HashRouter>
    </VerticalLayout>
);

export default class App extends React.Component {
    render() {

        init();

        return (
            <HashRouter>
                <div>
                    <Route exact={true} path="/" component={() => (<Redirect to={LocationHash.index}/>)}/>
                    <Route path={LocationHash.login} component={Login}/>
                    <Route path={LocationHash.register} component={Register}/>
                    <Route path={LocationHash.index} component={Main}/>
                </div>
            </HashRouter>
        );
    }
}

const init = () => {
    Session.token = CookieUtils.get('token');
};