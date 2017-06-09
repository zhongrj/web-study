import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import routes from "./routes/index";
import './index.css';

render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('root')
);
