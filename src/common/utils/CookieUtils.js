"use strict";

const _get = (key) => {
    let arr,
        reg = new RegExp("(^| )" + key + "=([^;]*)");
    if (arr = document.cookie.match(reg)) {
        return arr[2];
    }
    return null;
};

const _set = (key, value) => {
    document.cookie = key + "=" + value;
};

const _del = (key) => {
    document.cookie = key + "=";
};

const CookieUtils = {
    get: _get,
    set: _set,
    del: _del
};

export default CookieUtils;