"use strict";

import React from 'react';

import './MainLayout.scss'

/**
 * Header
 */
import {Row, Col} from 'antd';
const Header = (props) => (
    <Row className="zzone-layout-header">
        <Col span={6}>
            <div style={{float: 'right'}}>
                Logo
            </div>
        </Col>
        <Col span={12}>
            <HeaderMenu {...props}/>
        </Col>
        <Col span={6}>
            <div style={{float: 'right'}}>
                User
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
 * MainLayout
 */
export default class MainLayout extends React.Component {
    render() {
        return (
            <div className="zzone-layout">

                <Header menu={this.props.menu} />

                <div className="zzone-layout-content">
                    <div style={{height: 1200, width: 300}}>
                        {this.props.children}
                    </div>
                </div>

                <Footer footer={this.props.footer} />
            </div>
        );
    }
}


/**
 * HeaderMenu
 */
import {Menu, Icon} from 'antd';

class HeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: props.menu[0].path
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

    render() {
        let menu = this.props.menu,
            items = [];
        for (let i in menu) {
            items.push(
                <Menu.Item key={menu[i].path}>
                    <a href={"#" + menu[i].path}><Icon type={menu[i].icon}/>{menu[i].text}</a>
                </Menu.Item>
            );
        }
        return (
            <Menu
                onClick={this.handleClick.bind(this)}
                selectedKeys={[this.state.current]}
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