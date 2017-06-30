"use strict";

import React from 'react';

import './VerticalLayout.scss'

/**
 * Header
 */
import {Row, Col} from 'antd';
import HeaderUser from '../../components/user/HeaderUser';
const Header = (props) => (
    <Row className="zzone-layout-header">
        <Col span={6}>
            <div style={{float: 'right', paddingRight: '10px'}}>
                <span style={{fontSize: '14px'}}>
                    Logo
                </span>
            </div>
        </Col>
        <Col span={12}>
            <HeaderMenu menu={props.menu} user={props.user}/>
        </Col>
        <Col span={6}>
            <div style={{float: 'right', paddingRight: '10px'}}>
                <HeaderUser user={props.user} logout={props.logout}/>
            </div>
        </Col>
    </Row>
);


/**
 * Footer
 */
const Footer = (props) => (
    <div className="zzone-layout-footer">
        {props.footer}
    </div>
);


/**
 * VerticalLayout
 */
export default class VerticalLayout extends React.Component {
    constructor(props) {
        super(props);
        // 校验props
    }

    render() {
        return (
            <div className="zzone-layout">

                <Header menu={this.props.menu} user={this.props.user} logout={this.props.logout}/>

                <div className="zzone-layout-content">
                    {this.props.children}
                </div>

                <Footer footer={this.props.footer}/>
            </div>
        );
    }
}


/**
 * HeaderMenu
 */
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

class HeaderMenu extends React.Component {

    render() {
        let menu = this.props.menu,
            items = [];
        for (let i in menu) {
            let item = menu[i];
            if (item.auth && !this.props.user) continue;
            items.push(
                <Menu.Item key={item.path}>
                    <Link to={item.path}><Icon type={item.icon}/>{item.text}</Link>
                </Menu.Item>
            );
        }
        return (
            <Menu
                mode="horizontal"
                theme="dark"
                style={{
                    lineHeight: '50px',
                    fontSize: 14,
                }}
            >
                {items}
            </Menu>
        );
    }
}
