"use strict";

import React from 'react';

import {Dropdown, Avatar, Badge, Icon, Menu} from 'antd';

import './HeaderUser.scss';

const UserMenu = (
    <Menu className="zzone-user-menu">
        <Menu.Item>
            <a href="javascript:void(0)"><Icon type="user"/>个人资料</a>
        </Menu.Item>
        <Menu.Item>
            <a href="javascript:void(0)"><Icon type="lock"/>修改密码</a>
        </Menu.Item>
        <Menu.Item>
            <a href="javascript:void(0)"><Icon type="logout"/>退出登录</a>
        </Menu.Item>
    </Menu>
);


export default class HeaderUser extends React.Component {
    render() {
        return (
            <Dropdown overlay={UserMenu} trigger={['hover']}>
                <div className="zzone-user">
                    <a href="javascript:void(0)">
                        <Badge dot={true}><Avatar icon="user"/></Badge>
                        <span>User</span>
                        <Icon type="down"/>
                    </a>
                </div>
            </Dropdown>
        );
    }
}

