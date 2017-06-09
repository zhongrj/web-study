
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router';
import routes from './routes/index';
import "babel-polyfill";
import 'antd/dist/antd.css';

render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('root')
);