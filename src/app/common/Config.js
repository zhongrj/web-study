"use strict";

/**
 * 页脚
 */
export const footer = 'CopyRight © 蠢蛋系统 - Power By zhongrj';

/**
 * 后台接口url
 */
const contextPath = '/';
const Url = {
    login                : 'core/user/login',                                                // 登录
    logout               : 'core/user/logout',                                               // 登出
    register             : 'core/user/register',                                             // 注册
    userinfo             : 'core/user/info',                                                 // 获取用户信息
    post                 : 'community/post',                                                 // 发贴
    postList             : 'community/postList',                                             // 获取发贴列表
    commentList          : 'community/commentList',                                          // 获取评论列表
    comment              : 'community/comment',                                              // 评论
};
for (let key in Url) {
    Url[key] = contextPath + Url[key];
}
export {Url};


/**
 * 后台返回码
 */
export const Code = {
    success             :   '0000',
    failure             :   '9999',
    unlogin             :   '9998',
    unauth              :   '9997'
};


/**
 * 页面对应路径
 */
export const LocationHash = {
    index               :    '/main',                                             // 主页
    login               :    '/login',                                            // 登录页
    register            :    '/register',                                         // 注册页

    portal              :    '/main/portal',                                      // 门户模块

    community           :    '/main/community',                                   // 社区模块
    community_bbs       :    '/main/community/bbs',                               // 论坛

    console             :    '/main/console',                                     // 管理模块
    console_banner      :    '/main/console/portal/banner',                       // banner管理
    console_other       :    '/main/console/portal/other',                        // 主页其他管理
    console_comment     :    '/main/console/community/comment',                   // 留言管理

    user                :    '/main/user',                                        // 个人模块
    info                :    '/main/user/info',                                   // 个人信息
    password            :    '/main/user/password',                               // 修改密码

};



/**
 * header菜单
 */
export const headerMenu = [
    {
        path: LocationHash.portal,
        text: '首页',
        icon: 'home'
    }, {
        path: LocationHash.community,
        text: '社区',
        icon: 'team'
    }, {
        path: LocationHash.console,
        text: '管理',
        icon: 'mail',
        auth: true
    }, {
        path: LocationHash.user,
        text: '个人',
        icon: 'user',
        auth: true
    }
];


/**
 * 管理模块侧栏菜单
 */
export const consoleMenu = [
    {
        title: '主页管理',
        icon: 'home',
        key: 'portal',
        submenu: [
            {
                title: 'Banner图',
                icon: 'mail',
                path: LocationHash.console_banner
            }, {
                title: '其他管理',
                icon: 'cloud',
                path: LocationHash.console_other
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
                path: LocationHash.console_comment
            }
        ]
    }
];


export const communityMenu = [
    {
        title: '论坛',
        icon: 'home',
        path: LocationHash.community_bbs
    }
];


export const userMenu = [
    {
        title: '个人资料',
        icon: 'user',
        path: LocationHash.info
    }, {
        title: '修改密码',
        icon: 'user',
        path: LocationHash.password
    }
];