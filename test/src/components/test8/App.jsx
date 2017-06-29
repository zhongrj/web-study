"use strict";

import React from 'react';
import {} from 'antd';

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route name="home" breadcrumbName="Home" path="/" component={Home}>
                    <Route name="detail" breadcrumbName="Detail" path="detail" />
                </Route>
            </Router>
        );
    }
}

export default App;
import { Router, Route, hashHistory } from 'react-router';

const Home = ({routes, params, children}) => {
    console.log(routes);
    return (
        <div className="demo">

        </div>
    );
};
