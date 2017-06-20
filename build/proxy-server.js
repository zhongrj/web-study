"use strict";

/**
 * 根据后缀 转换 content-type
 * @param ext 后缀
 * @returns {string}
 * by subying tearlight2008@gmail.com
 */
const getContentType = (ext) => {
    let contentType = '';
    switch (ext) {
        case ".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".ico":
            contentType = "image/icon";
            break;
        default:
            contentType = "application/octet-stream";
    }
    return contentType;
};


let http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    fs = require('fs'),
    path = require('path'),
    config = require('./webpack.config.js');


let server = http.createServer(function (req, res) {
    let _url = req.url,
        _file,
        _localPath,
        _localFile,
        _ext,
        _stream;

    if (_url.indexOf('/static/') > -1) {
        _file = _url.match(/\/static(.*)/)[1];
        _ext = path.extname(_file);

        //转换成本地路径
        _localPath = config.output.path;
        _localFile = path.join(_localPath, _file);

        //判断文件是否存在
        if (fs.existsSync(_localFile)) {//如果文件存在
            res.writeHead(200, {"Content-Type": getContentType(_ext)});

            _stream = fs.createReadStream(_localFile, {flags: "r", encoding: null});//只读模式 读取文件内容
            _stream.on('error', function () {//如果读取错误 返回404
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("<h1>404 Read Error</h1>");
            });

            _stream.pipe(res);//连接文件流和http返回流的管道,用于返回实际Web内容

            _stream.on('end', function () {
                _stream = null;
            })

        } else {//返回404错误
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    } else {
        proxy.web(req, res, {target: 'http://127.0.0.1:8080'});
    }

});

console.log("index: http://localhost:5000/static/index.html");
server.listen(5000);