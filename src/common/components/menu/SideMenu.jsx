"use strict";

import React from 'react';
import {Menu, Icon} from 'antd';

const {SubMenu, ItemGroup, Item} = Menu;

import './SideMenu.scss';

import {consoleMenu} from '../../../config/config';


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

const getMenu = (menu) => {
    let result = [];

    for (let i in menu) {
        let sub = menu[i];

        if (sub.submenu) {
            let submenu = getMenu(sub.submenu);
            result.push(
                <SubMenu
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
                <Item>
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

export default class SideMenu extends React.Component {

    render() {

        let ConsoleMenu = getMenu(consoleMenu);

        return (
            <Menu
                className="zzone-sidemenu"
                mode="inline"
            >
                { ConsoleMenu }
            </Menu>
        );
    }

}