"use strict";

import {CookieUtils} from "../../common";
import {LocationHash} from '../config/Config';

export const Session = {};

export const SessionUtils = {
    logout: () => {
        for (let key in Session) {
            delete Session[key];
        }
        CookieUtils.del('token');
        location.hash = LocationHash.index;
    }
};