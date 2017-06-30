"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {HorizontalLayout, MyRoute} from '../../../common';

import {LocationHash, communityMenu} from '../../common/Config';

import BBS from './BBS';

export default class Community extends React.Component {

    render() {

        let {user, location} = this.props;

        return (
            <div style={{
                margin: '20px'
            }}>
                <HorizontalLayout location={location.pathname} menu={communityMenu}>

                    <Route exact={true} path={LocationHash.community}
                           component={() => (<Redirect to={LocationHash.community_bbs}/>)}/>
                    <MyRoute path={LocationHash.community_bbs} component={BBS} user={user}/>

                </HorizontalLayout>
            </div>
        );
    }
}