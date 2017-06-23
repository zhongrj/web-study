"use strict";

import {Ajax, CookieUtils} from '../../common';
import {Url, LocationHash, Code} from './Config';
import {message} from 'antd';

const macId = '123123d4112d423d4123d41313';

const getBaseModel = () => ({
    source: 'web',
    macId: macId
});

const service = (url, values, success) => {
    let model = getBaseModel();
    for (let key in values) {
        model[key] = values[key];
    }
    Ajax({
        url: url,
        type: 'POST_JSON',
        headers: {
            token: CookieUtils.get('token')
        },
        data: model,
        success: (response) => {
            let body = response.body;

            switch (body.code) {

                // 请求成功
                case Code.success:
                    success(response.body.content);
                    break;

                // 错误提示
                case Code.failure:
                    console.log(body);
                    message.error(body.msg);
                    break;

                // 会话超时
                case Code.unlogin:
                    message.warning("登录超时, 请重新登陆", 5);
                    CookieUtils.del('token');
                    location.hash = LocationHash.login;
                    break;

            }
        }
    });
};

export const login = (values, success) => {
    service(Url.login, {
        user: values
    }, success);
};

export const logout = () => {
    service(Url.logout, {}, () => {
    });
};


export const getUserInfo = (success) => {
    service(Url.userinfo, {}, success);
};















/**
 * 自制小提示
 */
import React from 'react';
import ReactDOM from 'react-dom'
const zzoneAlert = (type, message) => {
    let zzone_alert = document.getElementById('zzone-alert');
    zzone_alert.appendChild(document.createElement("div"));
    ReactDOM.render(
        <Alert
            message={message}
            type={type}
            showIcon={true}
            closable={true}
        />,
        document.getElementById('zzone-alert').lastChild
    );
};
