'use strict';

let webpack = require('webpack'),
    config = require('./webpack.config'),
    devClient = './build/dev-client',
	HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

config.output.publicPath = '/';

config.plugins = [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${config.paths.src}/index.html`,
        inject: true
    })
];

Object.keys( config.entry ).forEach(function(name, i){
    config.entry[name] = [ devClient ].concat( config.entry[name] );
});

module.exports = config;