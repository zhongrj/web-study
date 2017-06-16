"use strict";

import React from 'react';

import VerticalLayout from '../common/layouts/submain/VerticalLayout';
import {Routes} from './Routes';

import 'antd/dist/antd.css';

import {menu, footer} from '../config/config';

export default class App extends React.Component {
    render() {
        return (
            <VerticalLayout menu={menu} footer={footer}>
                <Routes/>
            </VerticalLayout>
        );
    }
}

