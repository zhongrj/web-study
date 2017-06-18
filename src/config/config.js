"use strict";


let portalPath = '#/main/portal';
let communityPath = '#/main/community';
let consolePath = '#/main/console';

export const menu = [
    {
        path: portalPath,
        text: '首页',
        icon: 'home'
    },{
        path: communityPath,
        text: '社区',
        icon: 'team'
    },{
        path: consolePath,
        text: '管理',
        icon: 'mail'
    }
];
export const consoleMenu = [
    {
        title: '主页管理',
        icon: 'home',
        key: 'portal',
        submenu: [
            {
                title: 'Banner图',
                icon: 'mail',
                path: `${consolePath}/portal/banner`
            }, {
                title: '其他管理',
                icon: 'cloud',
                path: `${consolePath}/portal/other`
            }
        ]
    }, {
        title: '社区管理',
        icon: 'team',
        key: 'community',
        submenu: [
            {
                title: '留言管理',
                icon: 'book',
                path: `${consolePath}/community/comment`
            }
        ]
    }
];


export const footer = 'CopyRight © 蠢蛋系统 - Power By zhongrj';

export const baseModel = {
    source: 'web',
    macId: '123123'
};