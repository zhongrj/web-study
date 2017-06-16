"use strict";

import React from 'react';
import {Menu, Icon} from 'antd';

const {SubMenu, Item} = Menu;

import './SideMenu.scss';

/**
 * menu的格式
 [
 {
     title: '一级1',
     submenu: [
         {
             title: '二级1',
             submenu: [
                 {
                     title: '三级1',
                     path: '/3menu1'
                 }, {
                     title: '三级2',
                     path: '/3menu2'
                 }
             ]
         }, {
             title: '二级2',
             path: '/2menu2'
         }
     ]
 }, {
         title: '一级2',
         path: '/1menu2'
     }
 ]
 */
const renderMenu = (menu) => {
    let result = [];

    for (let i in menu) {
        let sub = menu[i];

        if (sub.submenu) {
            let submenu = renderMenu(sub.submenu);
            result.push(
                <SubMenu
                    key={ sub.key }
                    title={
                        <span>
                            { (sub.icon) ? <Icon type={sub.icon}/> : "" }
                            { sub.title }
                        </span>
                    }
                >
                    { submenu }
                </SubMenu>
            );
        } else {
            result.push(
                <Item key={ sub.path }>
                    <a href={ sub.path }>
                        { (sub.icon) ? <Icon type={sub.icon}/> : "" }
                        { sub.title }
                    </a>
                </Item>
            )
        }
    }

    return result;
};

const getOpenKeys = (location) => {
    return location.split("/");
};

export default class SideMenu extends React.Component {

    render() {

        let MenuContent = renderMenu(this.props.menu);
        return (
            <Menu
                className="zzone-sidemenu"
                mode="inline"
                defaultOpenKeys={ getOpenKeys(this.props.location) }
                defaultSelectedKeys={ [this.props.location] }
                style={this.props.style}
            >
                { MenuContent }
            </Menu>
        );
    }

}