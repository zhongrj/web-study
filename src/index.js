"use strict";

import React from 'react';
import ReactDom from 'react-dom';

import {init} from './app/common/AppCommon';
import App from './app/App';

init();

ReactDom.render(
    <App/>,
    document.getElementById('root')
);