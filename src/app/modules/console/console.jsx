"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {HorizontalLayout} from '../../../common/index';

import {LocationHash, consoleMenu} from '../../common/Config';

import Banner from './Banner';

export default class Console extends React.Component {
    render() {
        if (!this.props.user) {
            return (<div/>);
        }
        return (
            <div style={{
                margin: '20px'
            }}>
                <HorizontalLayout menu={consoleMenu}>

                    <Route exact={true} path={LocationHash.console}
                           component={() => (<Redirect to={LocationHash.console_banner}/>)}/>
                    <Route path={LocationHash.console_banner} component={Banner}/>

                </HorizontalLayout>
            </div>
        );
    }
}