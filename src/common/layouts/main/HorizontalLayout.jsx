"use strict";

import React from 'react';
import {Row, Col} from 'antd';


import './HorizontalLayout.scss';

export default class HorizontalLayout extends React.Component {
    render() {
        let SideMenu = this.props.side;
        return (
            <Row className="zzone-submain-layout">
                <Col span={8}>
                    <div className="zzone-submain-layout-side">
                        <SideMenu/>
                    </div>
                </Col>
                <Col span={16}>
                    <div className="zzone-submain-layout-content">
                        <div style={{width: '400px', height: '1000px'}}></div>
                    </div>
                </Col>
            </Row>
        );
    }
}
