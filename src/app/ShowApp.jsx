"use strict";

import React from 'react';

import MainLayout from '../common/layouts/show/MainLayout';
import {Routes} from './Routes';

import 'antd/dist/antd.css';

import {menu, footer} from '../config/config';

export default class App extends React.Component {
    render() {
        return (
            <MainLayout menu={menu} footer={footer}>
                <Routes/>
            </MainLayout>
        );
    }
}

