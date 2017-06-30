"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {HorizontalLayout, MyRoute} from '../../../common';

import {LocationHash, userMenu} from '../../common/Config';

import Info from './Info';

export default class User extends React.Component {

    render() {

        let {user, location} = this.props;

        return (
            <div style={{
                margin: '20px'
            }}>
                <HorizontalLayout location={location.pathname} menu={userMenu}>

                    <Route exact={true} path={LocationHash.user}
                           component={() => (<Redirect to={LocationHash.info}/>)}/>
                    <MyRoute path={LocationHash.info} component={Info} user={user}/>

                </HorizontalLayout>
            </div>
        );
    }
}
