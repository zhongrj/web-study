"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {HorizontalLayout, MyRoute} from '../../../common';

import {LocationHash, consoleMenu} from '../../common/Config';

import Banner from './Banner';

export default class Console extends React.Component {
    render() {

        let {user, location} = this.props;

        if (!user) {
            return (<div/>);
        }
        return (
            <div style={{
                margin: '20px'
            }}>
                <HorizontalLayout location={location.pathname} menu={consoleMenu}>

                    <Route exact={true} path={LocationHash.console}
                           component={() => (<Redirect to={LocationHash.console_banner}/>)}/>
                    <MyRoute path={LocationHash.console_banner} component={Banner}/>

                </HorizontalLayout>
            </div>
        );
    }
}