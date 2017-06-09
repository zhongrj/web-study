'use strict';

let express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.js');

let app = express(),
    compiler = webpack(config);

// let devMiddleware = require('webpack-dev-middleware');


//待完善