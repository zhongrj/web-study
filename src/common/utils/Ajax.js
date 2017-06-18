"use strict";

import request from 'superagent';


export default (options) => {

    const settings = {
        type: "GET",
        data: {},
        headers: [],
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


    const ajaxSuccess = (res) => {
        success(res);
    };


    if (type === 'GET') {
        request
            .get(url)
            .query(data)
            .then(ajaxSuccess, failure);
    }

    else if (type === 'POST') {
        let r = request
            .post(url)
            .type('form');
        headers.map(header => r.set(header.key, header.val));
        r.send(data).then(ajaxSuccess, failure);
    }

    else if (type === 'POST_JSON') {
        let r = request
            .post(url)
            .set('Content-Type', 'application/json');
        headers.map(header => r.set(header.key, header.val));
        r.send(JSON.stringify(data)).then(ajaxSuccess, failure);
    }

}