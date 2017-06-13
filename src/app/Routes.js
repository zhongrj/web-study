"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';

import Portal from '../modules/portal'
import Console from '../modules/console'

export const Routes = () => (
    <HashRouter>
        <div>
            <Route exact={true} path="/">
                <Redirect to="/portal"/>
            </Route>
            <Route path="/portal" component={Portal}/>
            <Route path="/console" component={Console}/>
        </div>
    </HashRouter>
);
