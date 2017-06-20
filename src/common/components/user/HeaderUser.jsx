"use strict";

import React from 'react';
import {Dropdown, Avatar, Badge, Icon, Menu} from 'antd';

import './HeaderUser.scss';

import {Ajax, Session, SessionUtils} from '../../../common';
import {Url, LocationHash} from '../../config/Config';

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

    constructor(props) {
        super(props);
        this.state = {
            user: Session.user
        };
    }

    logout() {
        SessionUtils.logout();
    }

    componentDidMount() {
        if (Session.token && !Session.user) {
            Ajax({
                url: Url.userinfo,
                headers: {
                    token: Session.token
                },
                success: (data) => {
                    let user = data.content;
                    Session.user = user;
                    this.setState({
                        user: user
                    });
                }
            });
        }
    }

    render() {

        if (!this.state.user) {
            return (
                <div className="zzone-user">
                    <a href={"#" + LocationHash.login}>请登录</a>
                </div>
            );
        }

        return (
            <Dropdown overlay={(<UserMenu logout={this.logout.bind(this)}/>)} trigger={['hover']}>
                <div className="zzone-user">
                    <a href="javascript:void(0)">
                        <Badge dot={true}><Avatar icon="user"/></Badge>
                        <span>{this.state.user.name}</span>
                        <Icon type="down"/>
                    </a>
                </div>
            </Dropdown>
        );
    }
}

