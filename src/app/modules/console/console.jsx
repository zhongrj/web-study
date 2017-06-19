"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Card} from 'antd';
import {HorizontalLayout, SideMenu} from '../../../common/index';

import Banner from './Banner';

import {LocationHash, consoleMenu} from '../../common/Global';

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
                        <Route exact={true} path={LocationHash.console}
                               component={() => (<Redirect to={LocationHash.console_banner}/>)}/>
                        <Route path={LocationHash.console_banner} component={Banner}/>
                    </Card>
                </HorizontalLayout>
            </div>
        );
    }
}