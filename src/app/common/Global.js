"use strict";


/**
 * 获取basemodel
 */
export const getBaseModel = () => ({
    source: 'web',
    macId: '123123'
});


/**
 * 后台接口url
 */
const contextPath = '/';
const Url = {
    login                : 'core/user/login',                                                // 登录
    register             : 'core/user/register',                                             // 注册
    userinfo             : 'core/user/info',                                                 // 获取用户信息
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

    console             :    '/main/console',                                     // 管理模块
    console_banner      :    '/main/console/portal/banner',                       // banner管理
    console_other       :    '/main/console/portal/other',                        // 主页其他管理
    console_comment     :    '/main/console/community/comment',                   // 留言管理
};



/**
 * header菜单
 */
let LocationHashTemp = {};
for(let key in LocationHash) {
    LocationHashTemp[key] = '#' + LocationHash[key];
}
export const headerMenu = [
    {
        path: LocationHashTemp.portal,
        text: '首页',
        icon: 'home'
    }, {
        path: LocationHashTemp.community,
        text: '社区',
        icon: 'team'
    }, {
        path: LocationHashTemp.console,
        text: '管理',
        icon: 'mail'
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
                path: LocationHashTemp.console_banner
            }, {
                title: '其他管理',
                icon: 'cloud',
                path: LocationHashTemp.console_other
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
                path: LocationHashTemp.console_comment
            }
        ]
    }
];