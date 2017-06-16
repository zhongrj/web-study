"use strict";

import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';

import Portal from '../modules/portal';
import Community from '../modules/community';
import Console from '../modules/console';

export const Routes = () => (
    <HashRouter>
        <div>
            {/*<Route exact={true} path="/">*/}
                {/*<Redirect to="/portal"/>*/}
            {/*</Route>*/}
            <Route path="/portal" component={Portal}/>
            <Route path="/community" component={Community}/>
            <Route path="/console" component={Console}/>
        </div>
    </HashRouter>
);
