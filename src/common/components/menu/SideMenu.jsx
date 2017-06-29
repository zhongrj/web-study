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
                            { (sub.icon) ? <Icon type={ sub.icon }/> : "" }
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
                        { (sub.icon) ? <Icon type={ sub.icon }/> : "" }
                        { sub.title }
                    </a>
                </Item>
            );
            title[sub.path] = sub.title;
        }
    }

    return result;
};

const title = {};

export default class SideMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: location.hash.split("/"),
            selectKey: location.hash,
        };
    }

    onSelect({key}) {
        this.setState({
            openKeys: key.split("/"),
            selectKey: key,
        });
        this.props.onSelect(title[key]);
    }

    onOpenChange(openKeys) {
        this.setState({
            openKeys: openKeys
        });
    }

    componentDidMount() {
        this.onSelect({
            key: location.hash
        })
    }

    render() {
        return (
            <Menu
                className="zzone-sidemenu"
                style={this.props.style}
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.selectKey]}
                onOpenChange={this.onOpenChange.bind(this)}
                onSelect={this.onSelect.bind(this)}
            >
                {renderMenu(this.props.menu)}
            </Menu>
        );
    }

}