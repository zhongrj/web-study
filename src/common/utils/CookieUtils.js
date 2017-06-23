"use strict";

const CookieCache = {};

const _get = (key) => {
    let value;
    if (value = CookieCache[key]) {
        return value;
    }
    let arr,
        reg = new RegExp("(^| )" + key + "=([^;]*)");
    if (arr = document.cookie.match(reg)) {
        CookieCache[key] = arr[2];
        return arr[2];
    }
    return null;
};

const _set = (key, value) => {
    document.cookie = key + "=" + value;
    CookieCache[key] = value;
};

const _del = (key) => {
    document.cookie = key + "=";
    delete CookieCache[key];
};

const CookieUtils = {
    get: _get,
    set: _set,
    del: _del
};

export default CookieUtils;