"use strict";

import {CookieUtils, Session} from '../../common';

import {Code, LocationHash, Url} from './AppCommon';

/**
 * 响应拦截器
 * @param resBody
 * @param success
 */
export const ajaxInterceptor = (resBody, success) => {
    switch (resBody.code) {

        // 请求成功
        case Code.success:
            success(resBody);
            return;

        // 会话超时
        case Code.unlogin:
            console.log("会话超时");
            delete Session.token;
            CookieUtils.del('token');
            window.location.hash = LocationHash.login;
            return;

    }

};


/**
 * 项目初始化
 */
export const init = () => {

    Session.token = CookieUtils.get('token');

};

export const getUserInfo = (component) => {

};