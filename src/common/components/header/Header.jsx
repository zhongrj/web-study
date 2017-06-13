"use strict";

import React from 'react';

import HeaderMenu from '../menu/HeaderMenu';

export default class Header extends React.Component {

    render() {
        return (
            <div style={{
                height: '100%',
                lineHeight: '100%',
                backgroundColor: '#404040'
            }}>
                <div style={{
                    margin: '0 auto',
                    display: 'table'
                }}>
                    <HeaderMenu/>
                </div>
            </div>
        );
    }
}