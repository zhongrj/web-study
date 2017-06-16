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
            <HeaderMenu {...props}/>
        </Col>
        <Col span={6}>
            <div style={{float: 'right', paddingRight: '10px'}}>
                <HeaderUser />
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
    render() {
        return (
            <div className="zzone-layout">

                <Header menu={this.props.menu}/>

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
