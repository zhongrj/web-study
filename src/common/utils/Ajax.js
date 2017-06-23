"use strict";

import request from 'superagent';

export default (options) => {

    const settings = {
        type: "GET",
        data: {},
        headers: {},
        success: (res) => {
            console.log('request success...', res);
        },
        failure: (res) => {
            console.error('request failure...', res);
        }
    };
    const opts = Object.assign({}, settings, options);
    const type = opts.type.toUpperCase();

    let url = opts.url,
        data = opts.data,
        headers = opts.headers,
        success = opts.success,
        failure = opts.failure;


    const setHeaders = (request, headers) => {
        for (let key in headers) {
            request.set(key, headers[key]);
        }
    };


    if (type === 'GET') {
        let r = request.get(url);
        setHeaders(r, headers);
        r.query(data).then(success, failure);
    }

    else if (type === 'POST') {
        let r = request.post(url).type('form');
        setHeaders(r, headers);
        r.send(data).then(success, failure);
    }

    else if (type === 'POST_JSON') {
        let r = request.post(url).set('Content-Type', 'application/json');
        setHeaders(r, headers);
        r.send(JSON.stringify(data)).then(success, failure);
    }

}