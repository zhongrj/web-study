"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import VerticalLayout from '../common/layouts/main/VerticalLayout';
import Login from '../common/components/user/Login';

import Portal from '../modules/portal';
import Community from '../modules/community';
import Console from '../modules/console';

import {menu, footer} from '../config/config';

const Main = () => (
    <VerticalLayout menu={menu} footer={footer}>
        <HashRouter basename="/main">
            <div>
                {/*<Route exact={true} path="/">*/}
                {/*<Redirect to="/portal"/>*/}
                {/*</Route>*/}
                <Route path="/portal" component={Portal}/>
                <Route path="/community" component={Community}/>
                <Route path="/console" component={Console}/>
            </div>
        </HashRouter>
    </VerticalLayout>
);

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact={true} path="/" component={()=>(<Redirect to="/main"/>)}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/main" component={Main}/>
                </div>
            </HashRouter>
        );
    }
}

