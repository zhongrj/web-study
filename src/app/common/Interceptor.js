"use strict";

import {CookieUtils} from '../../common';

import {Code, LocationHash} from './Global';
import Session from './Session';

export const ajaxInterceptor = (resBody, success) => {
    switch (resBody.code) {

        // 请求成功
        case Code.success:
            success(body);
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