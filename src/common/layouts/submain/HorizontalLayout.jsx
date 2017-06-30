"use strict";

import React from 'react';
import {Row, Card} from 'antd';

import SideMenu from "../../components/menu/SideMenu";

import './HorizontalLayout.scss';

export default class HorizontalLayout extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: 'default'
        };
    }

    render() {
        let {location, menu} = this.props;
        let {title} = this.state;

        return (
            <Row className="zzone-submain-layout">
                <div className="zzone-submain-layout-side">
                    <SideMenu location={location} menu={menu} onSelect={((title) => {
                        this.setState({
                            title: title
                        });
                    }).bind(this)}/>
                </div>

                <div className="zzone-submain-layout-content">
                    <Card title={title} style={{
                        boxShadow: '0 0 0 white',
                        borderColor: '#e9e9e9'
                    }}>
                        {this.props.children}
                    </Card>
                </div>
            </Row>
        );
    }
}
