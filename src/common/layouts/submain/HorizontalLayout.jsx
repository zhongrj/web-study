"use strict";

import React from 'react';
import {Row} from 'antd';

import './HorizontalLayout.scss';

export default class HorizontalLayout extends React.Component {
    render() {
        let SideMenu = this.props.side;
        return (
            <Row className="zzone-submain-layout">
                <div className="zzone-submain-layout-side">
                    <SideMenu/>
                </div>

                <div className="zzone-submain-layout-content">
                    {this.props.children}
                </div>
            </Row>
        );
    }
}
