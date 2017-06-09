/**
 * Created by Mr.Gao @2016/12/07
 */

'use strict';
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    src     : path.resolve(__dirname, '../src'),
    dist    : path.resolve(__dirname, '../dist'),
    modules : path.resolve(__dirname, '../node_modules')
}

module.exports = {
    paths: PATHS,
    entry: {
        index: `${PATHS.src}/index.js`,
    },
    output: {
        path: `${PATHS.dist}/static`,
        publicPath: `static/`,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        alias: {

        }
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
				test: /\.(jpg|png|gif)$/i,
                loader: 'url-loader?limit=1000&name=img/[name]-[hash:10].[ext]'
			},
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: [
                        'add-module-exports',                       // for react-router
                        ['import', [{ 'libraryName': 'antd' }]]     // for antd
                    ]
                }
            }
        ]
    },
    externals: {

    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: `${PATHS.src}/index.html`,
            inject: true
        }),
        new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
			verbose: true,
			dry: false,
	    })
    ]
}