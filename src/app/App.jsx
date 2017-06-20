"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {VerticalLayout, Login, Register} from '../common';
import 'antd/dist/antd.css';

import Portal from './modules/portal/portal';
import Community from './modules/community/community';
import Console from './modules/console/console';

import {footer, LocationHash, headerMenu, init} from './common/AppCommon';

const Main = (props) => (
    <VerticalLayout menu={headerMenu} footer={footer} user={props.user}>
        <HashRouter>
            <div>
                <Route path={LocationHash.portal} component={Portal}/>
                <Route path={LocationHash.community} component={Community}/>
                <Route path={LocationHash.console} component={Console}/>
            </div>
        </HashRouter>
    </VerticalLayout>
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        init();
    }

    render() {

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