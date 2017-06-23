"use strict";

import React from 'react';
import {Dropdown, Avatar, Badge, Icon, Menu} from 'antd';

import './HeaderUser.scss';

import {LocationHash} from '../../config/Config';

const UserMenu = (props) => (
    <Menu className="zzone-user-menu">
        <Menu.Item>
            <a href="javascript:void(0)"><Icon type="user"/>个人资料</a>
        </Menu.Item>
        <Menu.Item>
            <a href="javascript:void(0)"><Icon type="lock"/>修改密码</a>
        </Menu.Item>
        <Menu.Item>
            <a href="javascript:void(0)" onClick={props.logout}><Icon type="logout"/>退出登录</a>
        </Menu.Item>
    </Menu>
);


export default class HeaderUser extends React.Component {

    render() {

        if (!this.props.user) {
            return (
                <div className="zzone-user">
                    <a href={"#" + LocationHash.login}>请登录</a>
                </div>
            );
        }

        return (
            <Dropdown overlay={(<UserMenu logout={this.props.logout}/>)} trigger={['hover']}>
                <div className="zzone-user">
                    <a href="javascript:void(0)">
                        <Badge dot={true}><Avatar icon="user"/></Badge>
                        <span>{this.props.user.name}</span>
                        <Icon type="down"/>
                    </a>
                </div>
            </Dropdown>
        );
    }
}

