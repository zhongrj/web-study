"use strict";

import {Ajax, CookieUtils} from '../../common';

import {Url, Session} from './AppCommon';

export const getUserInfo = () => {
    Ajax({
        url: Url.userinfo,
        headers: {
            token: CookieUtils.get('token')
        },
        success: (data) => {
            Session.user = data.content;
        }
    });
};