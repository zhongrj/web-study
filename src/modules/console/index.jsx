"use strict";

import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Card} from 'antd';
import HorizontalLayout from '../../common/layouts/submain/HorizontalLayout';
import SideMenu from '../../common/components/menu/SideMenu';

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
                                <Route path="/portal/banner" component={Banner}/>
                            </div>
                        </HashRouter>
                    </Card>
                </HorizontalLayout>
            </div>
        );
    }
}