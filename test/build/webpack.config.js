"use strict";

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    modules: path.resolve(__dirname, '../../node_modules')
};


module.exports = {
    entry: {
        index: PATHS.src + "/index.js"
    },
    output: {
        path: PATHS.dist + "/static",
        filename: "[name].[hash].js",
        // publicPath: 'static/',
        // chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            // { test: /\.scss$/, loaders: 'style!css!sass?sourceMap' },
            // { test: /\.(png|jpg)$/, loaders: 'url-loader?limit=8192' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            // AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        }
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: PATHS.src +  "/index.html",
            inject: true // 啥意思
        }),
        new webpack.DefinePlugin({          // 不知道干嘛的，提示搞的
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
        }),
        // new webpack.optimize.UglifyJsPlugin(),       // 压缩
    ]
};