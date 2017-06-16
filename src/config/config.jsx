"use strict";

export const menu = [
    {
        path: '/portal',
        text: '首页',
        icon: 'home'
    },{
        path: '/community',
        text: '社区',
        icon: 'team'
    },{
        path: '/console',
        text: '管理',
        icon: 'mail'
    }
];

let consolePath = '#/console';
export const consoleMenu = [
    {
        title: '一级1',
        submenu: [
            {
                title: '二级1',
                icon: 'mail',
                submenu: [
                    {
                        title: '三级1',
                        path: `${consolePath}/3menu1`
                    }, {
                        title: '三级2',
                        icon: 'mail',
                        path: `${consolePath}/3menu2`
                    }
                ]
            }, {
                title: '二级2',
                path: `${consolePath}/2menu2`
            }
        ]
    }, {
        title: '一级2',
        path: `${consolePath}/1menu2`
    }
];


export const footer = 'CopyRight © 蠢蛋系统 - Power By zhongrj';