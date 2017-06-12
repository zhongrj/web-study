"use strict";

import React from 'react';
import {Dropdown, BackTop, Menu} from 'antd';


const dropdownMenu = (
    <Menu style={{width: 300}}>
        <Menu.Item>菜单项</Menu.Item>
        <Menu.SubMenu title="子菜单">
            <Menu.Item>子菜单项</Menu.Item>
        </Menu.SubMenu>
    </Menu>
);

class App extends React.Component {
    render() {
        return (
            <div style={{height: 1500}}>

                <Dropdown overlay={dropdownMenu}>
                    <a className="ant-dropdown-link" href="#">
                        下拉菜单
                    </a>
                </Dropdown>

                <BackTop visibilityHeight={400} onClick={() => alert("回到顶部")}/>
            </div>
        );
    }
}

export default App;
