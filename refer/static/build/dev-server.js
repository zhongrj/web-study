'use strict';

let express = require('express'),
	webpack = require('webpack'),
	config = require('./webpack.config.dev');

let app = express(),
	compiler = webpack(config);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});

let hotMiddleware = require('webpack-hot-middleware')(compiler);

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
});

app.use(devMiddleware);
app.use(hotMiddleware);

// 监听 3000端口，开启服务器
app.listen(3000, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:3000');
});