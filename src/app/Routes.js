"use strict";

import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import Portal from '../modules/portal/index'

export const Routes = () => (
    <HashRouter>
        <Route path="/portal" component={Portal}/>
        {/*<Route path="/portal" component={}/>*/}
    </HashRouter>
);
