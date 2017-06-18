"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {Card} from 'antd';
import {HorizontalLayout, SideMenu} from '../../common';

import Banner from './Banner';

import {consoleMenu} from '../../config/config';

export default class Console extends React.Component {
    render() {
        let ConsoleMenu = () => (
            <SideMenu menu={consoleMenu} location={window.location.hash}/>
        );

        return (
            <div
                style={{
                    margin: '20px'
                }}
            >
                <HorizontalLayout side={ConsoleMenu}>
                    <Card title="xxxxxxx" style={{
                        boxShadow: '0 0 0 white',
                        borderColor: '#e9e9e9'
                    }}>
                        <HashRouter basename="/main/console">
                            <div>
                                <Route exact={true} path="/" component={()=>(<Redirect to="/portal/banner"/>)}/>
                                <Route path="/portal/banner" component={Banner}/>
                            </div>
                        </HashRouter>
                    </Card>
                </HorizontalLayout>
            </div>
        );
    }
}