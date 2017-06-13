"use strict";

import React from 'react';
import {Link} from 'react-router-dom';

import {Menu, Icon} from 'antd';
const Item = Menu.Item,
    SubMenu = Menu.SubMenu,
    MenuItemGroup = Menu.ItemGroup;

export default class HeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: '/portal'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                theme="dark"
                style={{
                    lineHeight: '50px',
                    fontSize: 14,
                }}
            >
                <Item key="/portal">
                    <a href="#/portal"><Icon type="home"/>首页</a>
                </Item>
                <Item key="/community">
                    <a href="#/community"><Icon type="team"/>社区</a>
                </Item>
                <Item key="/console">
                    <a href="#/console"><Icon type="mail"/>管理</a>
                </Item>

            </Menu>
        );
    }
}