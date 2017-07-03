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
            let data = response.body;

            switch (data.code) {

                // 请求成功
                case Code.success:
                    success(data);
                    break;

                // 错误提示
                case Code.failure:
                    console.log(data);
                    message.error(data.msg);
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

export const Service = {
    login: (values, success) => {
        service(Url.login, {
            user: values
        }, success);
    },
    logout: () => {
        service(Url.logout, {}, () => {
        });
    },
    getUserInfo: (success) => {
        service(Url.userinfo, {}, success);
    },
    modifyInfo: (values, success) => {
        service(Url.modifyInfo, {
            user: values
        }, success);
    },
    modifyPassword: (values, success) => {
        service(Url.modifyPassword, {
            user: values
        }, success);
    },
    post: (values, success) => {
        service(Url.post, values, success);
    },
    postList: (values, success) => {
        service(Url.postList, values, success);
    },
    commentList: (values, success) => {
        service(Url.commentList, values, success);
    },
    comment: (values, success) => {
        service(Url.comment, values, success);
    }
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
