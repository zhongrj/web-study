"use strict";

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {HorizontalLayout} from '../../../common';

import {LocationHash, communityMenu} from '../../common/Config';

import BBS from './BBS';

export default class Community extends React.Component {

    render() {
        return (
            <div style={{
                margin: '20px'
            }}>
                <HorizontalLayout menu={communityMenu}>

                    <Route exact={true} path={LocationHash.community}
                           component={() => (<Redirect to={LocationHash.community_bbs}/>)}/>
                    <Route path={LocationHash.community_bbs} component={BBS}/>

                </HorizontalLayout>
            </div>
        );
    }
}