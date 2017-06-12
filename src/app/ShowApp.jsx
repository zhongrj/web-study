"use strict";

import React from 'react';

import MainLayout from '../common/layouts/show/MainLayout';
import {Routes} from './Routes';

export default class App extends React.Component {
    render() {
        return (
            <MainLayout
                header={() => (<div>header123</div>)}
                footer={() => (<div>@CopyRight © ... - Power By zhongrj</div>)}
            >
                <Routes/>
            </MainLayout>
        );
    }
}

