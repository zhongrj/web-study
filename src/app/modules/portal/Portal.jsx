"use strict";

import React from 'react';
import {Banner} from '../../../common'

export default class Portal extends React.Component {
    render() {
        return (
            <div style={{
                marginTop: 20
            }}>
                <Banner/>
                <div style={{
                    margin: '20 auto 0',
                    width: 1200,
                    height: 500
                }}>
                    content
                </div>
            </div>
        );
    }
}